import { HelpCircle, Package, RefreshCcw, Truck, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
    title: "FAQ | Pawlio",
    description: "Frequently asked questions about Pawlio products and orders.",
};

export default function FAQPage() {
    const faqs = [
        {
            icon: Truck,
            question: "How long does shipping take?",
            answer: "Standard shipping within the US takes 3-5 business days. International shipping can take up to 14 business days. Please allow 1-2 extra days for processing personalized orders before they ship."
        },
        {
            icon: MessageCircle,
            question: "Can I change my personalized text?",
            answer: "If you spot an error in your personalization, please contact us within 12 hours of placing your order. Once production has started and the item is engraved, we are unable to make changes."
        },
        {
            icon: Package,
            question: "Do you ship internationally?",
            answer: "Yes! We ship to most countries worldwide. Shipping costs, delivery times, and available couriers will be calculated at checkout based on your exact location."
        },
        {
            icon: RefreshCcw,
            question: "What happens if my item arrives damaged?",
            answer: "We take great care in packaging, but if your item arrives damaged in transit, please email us a photo immediately. We will rush a replacement out to you at no extra cost to ensure you are happy."
        },
        {
            icon: HelpCircle,
            question: "Can I customize a memorial product with a specific photo?",
            answer: "Absolutely. Simply upload a high-quality, bright image on the product page before checking out, and our artisans will seamlessly integrate your pet's photo into the memorial plaque or crystal."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-linear-to-b from-background to-muted/10">
            {/* Hero Section */}
            <section className="relative py-20 bg-linear-to-br from-primary/10 via-background to-muted/20 border-b border-border/50">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
                            Everything you need to know about our personalized products, shipping, and more.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Accordion Section */}
            <section className="py-16 md:py-24 relative bg-linear-to-r from-primary/80 via-primary/60 to-primary/40">
                {/* Decorative background blob */}
                <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>
                
                <div className="container mx-auto px-4 max-w-3xl relative z-10">
                    <FadeIn delay={0.1}>
                        <div className="bg-background/80 backdrop-blur-md rounded-2xl border border-primary/10 p-6 md:p-10 shadow-xl shadow-primary/5">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, idx) => (
                                    <AccordionItem key={idx} value={`item-${idx}`} className={idx === faqs.length - 1 ? "border-b-0" : ""}>
                                        <AccordionTrigger className="cursor-pointer text-left text-lg font-medium hover:text-primary transition-colors py-6">
                                            <span className="flex items-center gap-4">
                                                <div className="p-2 bg-primary rounded-full">
                                                    <faq.icon className="w-5 h-5 text-muted" />
                                                </div>
                                                {faq.question}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pl-13">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
