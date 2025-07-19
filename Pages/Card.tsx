import { Card, CardContent } from "@/components/ui/card";
import { AiFillFolder } from "react-icons/ai";

const templates = [
  {
    id: 1,
    title: "Event Registration Form",
    description:
      "Easily gather attendee information with this clean and responsive event registration form. Great for webinars, meetups, or workshops.",
  },
  {
    id: 2,
    title: "Contact Form Template",
    description:
      "Use this professional contact form to collect inquiries, support requests, or client messages on your website quickly and efficiently.",
  },
  {
    id: 3,
    title: "Survey Form",
    description:
      "Create engaging surveys to understand your users, gather feedback, or conduct research with a user-friendly design.",
  },
  {
    id: 4,
    title: "Job Application",
    description:
      "A modern job application form that helps recruiters collect applicant details, resumes, and cover letters in an organized way.",
  },
  {
    id: 5,
    title: "Newsletter Signup",
    description:
      "Build your email list with this simple yet attractive newsletter subscription form. Works great with Mailchimp or custom APIs.",
  },
  {
    id: 6,
    title: "Feedback Form",
    description:
      "Get actionable insights from your users with this thoughtfully designed feedback form. Customizable for any platform.",
  },
];

export default function Cart() {
  return (
    <section className="max-w-7xl rounded-full border-t-2 mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Free Professional Templates
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our curated collection of ready-to-use form templates. Whether
          you're hosting an event or collecting feedback, these designs help you
          get started faster and look professional.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="bg-white border-t-4 border-t-purple-700 rounded-[30px_10px_30px_10px] shadow-sm hover:shadow-2xl transition transform hover:scale-[1.03] duration-300 p-6"
          >
            <CardContent className="p-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2 tracking-wide border-b border-gray-300 pb-2">
                <AiFillFolder className="text-purple-700" size={20} />
                {template.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {template.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
