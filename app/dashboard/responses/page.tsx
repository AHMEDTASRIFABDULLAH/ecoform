"use client";
import React, { useEffect, useState } from "react";
import { handelGetResponse } from "@/api/fetch";
import { useUser } from "@/context/UserContext";
import { FileText, Users, Mail, Calendar, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
type AnswerValue = string | string[];
interface ResponseType {
  _id: string;
  formId: string;
  submitUser: string;
  answers: Record<string, AnswerValue>;
  submittedAt: string;
}
interface FormType {
  _id: string;
  formTitle: string;
  formDescription: string;
  email: string;
}
interface FullResponseData {
  ownerEmail: string;
  totalForms: number;
  totalResponses: number;
  forms: FormType[];
  responses: ResponseType[];
}
export default function AllResponses() {
  const { user } = useUser();
  const [data, setData] = useState<FullResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedForms, setExpandedForms] = useState<Record<string, boolean>>(
    {}
  );
  useEffect(() => {
    if (!user?.email) return;

    const fetchResponses = async () => {
      setLoading(true);
      try {
        const res: FullResponseData = await handelGetResponse(user.email);
        setData(res);
      } catch (error) {
        console.error("Error loading responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [user?.email]);

  const toggleExpand = (formId: string) => {
    setExpandedForms((prev) => ({
      ...prev,
      [formId]: !prev[formId],
    }));
  };
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600">
        <div className="animate-spin w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
        Loading responses...
      </div>
    );
  }

  if (!data) {
    return (
      <p className="text-center py-10 text-gray-600 font-medium">
        No responses found.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl text-center font-semibold tracking-tight mb-10 text-black">
        Response Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Card className="bg-white shadow-md">
          <CardContent className="p-5 flex items-center space-x-4">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Total Forms</p>
              <p className="text-xl font-bold">{data.totalForms}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-5 flex items-center space-x-4">
            <Users className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Total Responses</p>
              <p className="text-xl font-bold">{data.totalResponses}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-5 flex items-center space-x-4">
            <Mail className="h-6 w-6 text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Owner Email</p>
              <p className="text-sm font-semibold truncate">
                {data.ownerEmail}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      {data.forms.map((form) => {
        const relatedResponses = data.responses.filter(
          (res) => res.formId === form._id
        );
        const isExpanded = expandedForms[form._id] || false;
        const displayResponses = isExpanded
          ? relatedResponses
          : relatedResponses.slice(0, 3);

        return (
          <Card key={form._id} className="mb-8 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl text-gray-900">
                    {form.formTitle}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {form.formDescription}
                  </p>
                  <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                    <span className="inline-flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{relatedResponses.length} responses</span>
                    </span>
                    <span className="inline-flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{form.email}</span>
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {displayResponses.map((res) => (
                <details
                  key={res._id}
                  className="rounded-md border border-gray-200 bg-white p-4 shadow-sm group"
                >
                  <summary className="cursor-pointer list-none font-medium text-gray-800 flex justify-between items-center">
                    <span>
                      {res.submitUser} —{" "}
                      <time
                        className="text-sm text-gray-500"
                        dateTime={res.submittedAt}
                      >
                        {formatDate(res.submittedAt)}
                      </time>
                    </span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-open:rotate-180 transition-transform duration-200 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="mt-4 space-y-2 text-sm text-gray-700">
                    {Object.entries(res.answers).map(
                      ([question, answer], i) => (
                        <div key={i}>
                          <span className="font-semibold">{question}:</span>{" "}
                          {Array.isArray(answer) ? answer.join(", ") : answer}
                        </div>
                      )
                    )}
                  </div>
                </details>
              ))}

              {relatedResponses.length > 3 && (
                <div className="text-center">
                  <button
                    onClick={() => toggleExpand(form._id)}
                    className="mt-3 text-sm font-medium text-purple-600 hover:underline flex items-center justify-center gap-1"
                  >
                    {isExpanded ? (
                      <>
                        <EyeOff className="h-4 w-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        Show All ({relatedResponses.length})
                      </>
                    )}
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
