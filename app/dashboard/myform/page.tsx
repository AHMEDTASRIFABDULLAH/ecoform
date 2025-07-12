"use client";

import { useEffect, useState } from "react";
import { handelGetFormsByEmail, handelDeleteForm } from "@/api/fetch";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { MdContentCopy, MdCheck } from "react-icons/md";
import { Pencil, Trash, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type FormData = {
  _id: string;
  formTitle: string;
  formDescription: string;
  createdAt?: string;
};

export default function Cart() {
  const { user } = useUser();
  const [templates, setTemplates] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchTemplates = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const data = await handelGetFormsByEmail(user.email);
      setTemplates(data);
    } catch (err) {
      console.error("Failed to load templates", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [user?.email]);

  const handleDelete = async (id: string) => {
    try {
      await handelDeleteForm(id);
      await fetchTemplates();
      setOpenDialogId(null);
    } catch (error) {
      console.error("Failed to delete form", error);
    }
  };

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/dashboard/myform/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold tracking-tight mb-4 text-black">
          My Saved Forms
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-base leading-relaxed">
          Browse and manage the forms you’ve created with ease.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 font-medium">
          Loading forms...
        </div>
      ) : templates.length === 0 ? (
        <p className="text-center text-gray-600 font-medium">No forms found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template._id}
              className="relative bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col"
            >
              <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-tr-[2rem]" />

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {template.formTitle}
                  </h3>
                  <p className="text-base text-gray-700 font-normal mb-3 line-clamp-3 leading-relaxed">
                    {template.formDescription || "No description provided."}
                  </p>
                  {template.createdAt && (
                    <p className="text-sm text-gray-500 italic mb-4">
                      Created on{" "}
                      {new Date(template.createdAt).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/dashboard/myform/${template._id}`}
                      className="text-purple-800 hover:text-purple-900 font-semibold flex items-center gap-2 transition-colors duration-200 hover:underline"
                    >
                      <FaEye className="text-base" />
                      View Form
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleCopyLink(template._id)}
                      className="text-gray-600 hover:text-gray-800 flex items-center gap-1 font-semibold transition-colors duration-200"
                      title="Copy link"
                    >
                      <MdContentCopy />
                      {copiedId === template._id && (
                        <MdCheck className="text-green-600 ml-1" />
                      )}
                    </button>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <MoreVertical className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      side="bottom"
                      className="w-36"
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          // edit logic here
                        }}
                        className="flex items-center gap-2 text-purple-700 hover:text-purple-900"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOpenDialogId(template._id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Dialog
                open={openDialogId === template._id}
                onOpenChange={(open) => {
                  if (!open) setOpenDialogId(null);
                }}
              >
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                  </DialogHeader>
                  <div className="text-gray-600">
                    This action cannot be undone. Do you want to permanently
                    delete this form?
                  </div>
                  <DialogFooter className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setOpenDialogId(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(template._id)}
                    >
                      Yes, delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
