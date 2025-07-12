"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { handelGetFormsById, handelSubmitForm } from "@/api/fetch";
import MyLoding from "@/Pages/MyLoding";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

type QuestionType =
  | "text"
  | "textarea"
  | "email"
  | "radio"
  | "checkbox"
  | "select";

type Question = {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  options: string[];
};

type FormData = {
  formTitle: string;
  formDescription: string;
  questions: Question[];
};

export default function DetailsForm() {
  const { id } = useParams() as { id: string };
  const [form, setForm] = useState<FormData | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function fetchForm() {
      if (!id) return;
      try {
        const data = await handelGetFormsById(id);
        setForm(data);
      } catch (error) {
        console.error("Failed to load form by ID:", error);
      }
    }
    fetchForm();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form) return;

    const formData = new FormData(e.currentTarget);
    const values: { [key: string]: any } = {};

    form.questions.forEach((q, index) => {
      const key = `q-${index}`;
      if (q.type === "checkbox") {
        values[q.label] = formData.getAll(key);
      } else {
        values[q.label] = formData.get(key);
      }
    });

    const fullData = {
      formId: id,
      formTitle: form.formTitle,
      formDescription: form.formDescription,
      submitUser: user?.email || "anonymous",
      answers: values,
    };

    try {
      const res = await handelSubmitForm(fullData);
      if (res) {
        toast.success("Form submitted successfully");
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Form submission failed. Please try again.");
    }
  };

  if (!form) return <MyLoding />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow border-t-8 border-purple-600">
        <h1 className="text-3xl font-bold mb-1 text-gray-800">
          {form.formTitle}
        </h1>
        <p className="text-gray-600 mb-6">{form.formDescription}</p>

        {submitted ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              Thank you for your response!
            </h2>
            <p className="text-gray-700">We’ve received your answers.</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {form.questions?.map((q, index) => (
              <div key={q.id || index} className="border-b pb-4">
                <label className="block font-medium text-gray-700 mb-2">
                  {q.label}{" "}
                  {q.required && <span className="text-red-500">*</span>}
                </label>
                {q.type === "text" && (
                  <input
                    type="text"
                    name={`q-${index}`}
                    className="w-full p-2 border rounded"
                    required={q.required}
                  />
                )}
                {q.type === "textarea" && (
                  <textarea
                    rows={3}
                    name={`q-${index}`}
                    className="w-full p-2 border rounded"
                    required={q.required}
                  />
                )}
                {q.type === "email" && (
                  <input
                    type="email"
                    name={`q-${index}`}
                    className="w-full p-2 border rounded"
                    required={q.required}
                  />
                )}
                {["radio", "checkbox"].includes(q.type) && (
                  <div className="space-y-2">
                    {q.options?.map((opt, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <input
                          type={q.type}
                          name={`q-${index}`}
                          value={opt}
                          required={q.required && q.type === "radio"}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}
                {q.type === "select" && (
                  <select
                    name={`q-${index}`}
                    className="w-full p-2 border rounded"
                    required={q.required}
                  >
                    <option value="">Select...</option>
                    {q.options?.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-bold mt-6"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
