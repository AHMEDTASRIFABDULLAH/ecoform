"use client";
import React, { useEffect, useState } from "react";

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

export default function SaveForm() {
  const [form, setForm] = useState<FormData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("saved_form");
    if (stored) setForm(JSON.parse(stored));
  }, []);

  if (!form) return <p className="text-center mt-10">Loading form...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow border-t-8 border-purple-600">
        <h1 className="text-3xl font-bold mb-1 text-gray-800">
          {form.formTitle}
        </h1>
        <p className="text-gray-600 mb-6">{form.formDescription}</p>
        <form className="space-y-6">
          {form.questions.map((q, index) => (
            <div key={q.id} className="border-b pb-4">
              <label className="block font-medium text-gray-700 mb-2">
                {q.label}{" "}
                {q.required && <span className="text-red-500">*</span>}
              </label>

              {q.type === "text" && (
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  required={q.required}
                />
              )}
              {q.type === "textarea" && (
                <textarea
                  rows={3}
                  className="w-full p-2 border rounded"
                  required={q.required}
                />
              )}
              {q.type === "email" && (
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  required={q.required}
                />
              )}
              {["radio", "checkbox"].includes(q.type) && (
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <input
                        type={q.type}
                        name={`q-${index}`}
                        value={opt}
                        required={q.required}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
              {q.type === "select" && (
                <select
                  className="w-full p-2 border rounded"
                  required={q.required}
                >
                  <option value="">Select...</option>
                  {q.options.map((opt, i) => (
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
      </div>
    </div>
  );
}
