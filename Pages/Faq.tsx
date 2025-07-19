import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold tracking-tight text-center mb-8">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Ecoform?</AccordionTrigger>
          <AccordionContent>
            Ecoform is a modern, easy-to-use form builder that helps you create
            forms for surveys, registrations, contact, and more — all without
            writing code.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is it free to use?</AccordionTrigger>
          <AccordionContent>
            Yes! NextForm offers a free tier that gives you access to basic
            features. You can upgrade for more advanced capabilities.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Can I customize the form design?</AccordionTrigger>
          <AccordionContent>
            Absolutely. You can change colors, fonts, layout, and even add
            custom logic or integrations.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>How do I collect responses?</AccordionTrigger>
          <AccordionContent>
            All responses are automatically collected in your dashboard. You can
            also export them or connect to third-party services.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
