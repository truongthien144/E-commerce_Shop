import { CheckCircle2, MessageSquare, CreditCard, AlertCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata = {
    title: "Returns & Refunds | Pawlio",
    description: "Pawlio returns and refunds policy.",
};

export default function ReturnsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-b from-background to-muted/10">
            {/* Hero Section */}
            <section className="relative py-20 bg-linear-to-br from-primary/10 via-background to-muted/20 border-b border-border/50">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
                            Returns & Refunds
                        </h1>
                        <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
                            We want you to love your order. Here is making returns as simple and transparent as possible.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-20 md:py-24 bg-linear-to-b from-primary/80 via-primary/40 to-muted/40">
                <div className="container mx-auto px-4 max-w-5xl">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                            <p className="text-muted-foreground">Follow these simple steps to process your return or exchange.</p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line for Desktop */}
                        <div className="hidden md:block absolute top-18 left-[15%] right-[15%] h-0.5 bg-border -z-10"></div>

                        {[
                            {
                                step: "Step 1",
                                icon: CheckCircle2,
                                title: "Check Eligibility",
                                desc: "Non-personalized items are eligible for returns within 30 days of delivery, provided they are unused and in original packaging."
                            },
                            {
                                step: "Step 2",
                                icon: MessageSquare,
                                title: "Contact Support",
                                desc: "Send our friendly support team an email with your order number to request a return or report a damaged item."
                            },
                            {
                                step: "Step 3",
                                icon: CreditCard,
                                title: "Receive Refund",
                                desc: "Once inspected and approved, your refund will automatically be processed to your original method of payment."
                            }
                        ].map((item, idx) => (
                            <FadeIn key={idx} delay={idx * 0.2} className="relative cursor-pointer group">
                                <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 pt-12 text-center h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/5 group-hover:border-primary/50 relative mt-8">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-background border rounded-full flex items-center justify-center shadow-sm group-hover:border-primary/30 transition-colors duration-300">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                            <item.icon className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm font-semibold rounded-full mb-4">
                                        {item.step}
                                    </span>
                                    <h3 className="text-xl font-bold mb-4 text-foreground">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.6}>
                        <div className="mt-24 p-8 bg-linear-to-r from-destructive/10 to-destructive/5 border border-destructive/20 rounded-2xl flex items-start gap-5 shadow-lg shadow-destructive/5 cursor-default hover:border-destructive/40 transition-colors duration-300">
                            <AlertCircle className="w-8 h-8 text-destructive shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">Important Note on Personalized Items</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Because personalized items are permanently engraved or printed specifically for you, <strong>they cannot be returned or exchanged</strong> unless they arrive damaged or defective. We ask that you carefully review your personalization details and spellings before submitting your order.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
