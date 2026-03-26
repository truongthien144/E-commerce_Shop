import { Clock, Truck, CalendarDays, Globe } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata = {
    title: "Shipping Policy | Pawlio",
    description: "Information about Pawlio shipping times and rates.",
};

export default function ShippingPage() {
    const policies = [
        {
            icon: Clock,
            title: "Processing Time",
            desc: "Because many of our Pawlio products are uniquely personalized, please allow 1-2 business days for our artisans to carefully craft and package your order before it is shipped."
        },
        {
            icon: Truck,
            title: "Shipping Methods",
            desc: "We offer both standard and expedited shipping options at checkout. Free standard shipping is automatically applied to all domestic orders over $50."
        },
        {
            icon: CalendarDays,
            title: "Estimated Delivery",
            desc: "Standard US shipping typically takes 3-5 Business Days. Need it faster? Expedited US shipping will arrive in just 1-2 Business Days after processing."
        },
        {
            icon: Globe,
            title: "International Orders",
            desc: "We ship globally! International shipping generally takes 7-14 Business Days depending on your location. Please note that customs or import duties are the responsibility of the customer."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-linear-to-b from-background to-muted/10">
            {/* Hero Section */}
            <section className="relative py-20 bg-linear-to-br from-primary/10 via-background to-muted/20 border-b border-border/50">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
                            Shipping Policy
                        </h1>
                        <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
                            Everything you need to know about how your personalized items get from our workshop to your doorstep.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-20 md:py-24 bg-linear-to-r from-primary/80 via-primary/60 to-primary/40">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-8">
                        {policies.map((policy, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="bg-background/80 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/50 cursor-pointer flex flex-col md:flex-row gap-6 items-start group">
                                    <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                                        <policy.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold mb-3 text-foreground">{policy.title}</h2>
                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            {policy.desc}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.5}>
                        <div className="mt-16 p-8 bg-background/80 rounded-2xl border border-primary/10 shadow-lg shadow-primary/5 text-center">
                            <h3 className="text-xl font-bold mb-3">Damaged in Transit?</h3>
                            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                If you receive your order damaged, please contact us immediately with a photo so we can file a claim 
                                and rush a replacement to you.
                            </p>
                            <a href="/contact" className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6">
                                Contact Support
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
