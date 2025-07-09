"use client";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineClose } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

const questionTypes = [
  "text",
  "textarea",
  "email",
  "radio",
  "checkbox",
  "select",
] as const;
type QuestionType = (typeof questionTypes)[number];

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

export default function DynamicForm() {
  const router = useRouter();
  const { register, control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      formTitle: "Untitled Form",
      formDescription: "Form description goes here...",
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const questions = watch("questions");

  const onSubmit = (data: FormData) => {
    console.log("Saving form data:", data);
    localStorage.setItem("saved_form", JSON.stringify(data));
    router.push("/dashboard/save");
  };

  const addQuestion = () => {
    append({
      id: uuidv4(),
      label: "",
      type: "text",
      required: false,
      options: [""],
    });
  };

  return (
    <div className="min-h-screen bg-[#f0ebf8] py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md p-6 border-t-8 border-purple-600 mb-8">
        <input
          {...register("formTitle")}
          className="text-3xl font-semibold text-gray-800 w-full border-b border-transparent focus:border-purple-500 outline-none mb-2"
        />
        <textarea
          {...register("formDescription")}
          rows={2}
          className="w-full resize-none text-sm text-gray-600 border-b border-transparent focus:border-purple-500 outline-none"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto space-y-6"
      >
        {fields.map((field, index) => {
          const currentType = questions?.[index]?.type || "text";
          return (
            <div
              key={field.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Question {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-800 text-xl"
                >
                  <MdDelete />
                </button>
              </div>
              <input
                {...register(`questions.${index}.label` as const)}
                placeholder="Question text"
                className="w-full border-b border-gray-300 p-2 mb-4 outline-none focus:border-purple-600"
              />
              <select
                {...register(`questions.${index}.type` as const)}
                className="w-full bg-purple-50 border border-gray-300 rounded-md p-2 mb-4"
              >
                {questionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              {["select", "radio", "checkbox"].includes(currentType) && (
                <Controller
                  control={control}
                  name={`questions.${index}.options` as const}
                  render={({ field }) => (
                    <div className="space-y-2 mb-4">
                      <label className="text-sm font-medium text-gray-600">
                        Options
                      </label>
                      {field.value.map((opt: string, optIndex: number) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            value={opt}
                            onChange={(e) => {
                              const newOptions = [...field.value];
                              newOptions[optIndex] = e.target.value;
                              field.onChange(newOptions);
                            }}
                            placeholder={`Option ${optIndex + 1}`}
                            className="flex-1 p-2 border border-gray-300 rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newOptions = field.value.filter(
                                (_, i) => i !== optIndex
                              );
                              field.onChange(newOptions);
                            }}
                            className="text-xl text-red-600 hover:text-red-800"
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => field.onChange([...field.value, ""])}
                        className="text-xs flex items-center gap-1 text-purple-600 hover:underline"
                      >
                        <FaPlusCircle /> Add Option
                      </button>
                    </div>
                  )}
                />
              )}
              <div className="flex items-center mt-4">
                <Controller
                  control={control}
                  name={`questions.${index}.required` as const}
                  render={({ field }) => (
                    <>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Required
                      </label>
                    </>
                  )}
                />
              </div>
            </div>
          );
        })}
        <div className="flex justify-end fixed bottom-6 right-6 z-50">
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-full gap-1 shadow-lg transition-transform hover:scale-105"
          >
            <FaPlus /> Add Question
          </button>
        </div>
        {fields.length > 0 && (
          <div className="pt-10">
            <button
              type="submit"
              className="w-full bg-[#9810FA] text-white font-bold py-3 px-6 rounded-lg transition-shadow shadow-sm hover:shadow-lg"
            >
              Save Form
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
