import { ShieldCheck, Cookie, Database, Lock } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata = {
    title: "Privacy Policy | Pawlio",
    description: "Our commitment to your privacy.",
};

export default function PrivacyPage() {
    const sections = [
        {
            icon: Database,
            title: "Data Collection",
            content: "We collect several types of information from and about users of our Website. This includes Personal Data (like your name, postal address, e-mail address, telephone number, and payment information) and Usage Data (details of your visits to our Website, traffic data, location data, and logs)."
        },
        {
            icon: Cookie,
            title: "Cookies",
            content: "We use cookies and similar tracking technologies to track activity on our service and hold certain information. They help us remember your cart items, understand your preferences for future visits, and compile aggregate data about site traffic so we can offer better experiences."
        },
        {
            icon: Lock,
            title: "Data Protection",
            content: "We have implemented strict security measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All payment transactions are fully encrypted using SSL technology."
        },
        {
            icon: ShieldCheck,
            title: "Third-Party Services",
            content: "We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, so long as those parties agree to keep this information confidential."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-linear-to-b from-background to-muted/10">
            {/* Hero Section */}
            <section className="relative py-20 bg-linear-to-t from-primary/80 via-primary/40 to-primary/40 border-b border-border/50">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
                            At Pawlio, we respect your privacy and are deeply committed to protecting it.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12">
                        {sections.map((section, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="group cursor-pointer p-6 -mx-6 rounded-2xl transition-all duration-300 hover:bg-muted/30">
                                    <div className="flex items-start gap-6">
                                        <div className="p-4 bg-muted rounded-2xl text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 shrink-0">
                                            <section.icon className="w-8 h-8" />
                                        </div>
                                        <div className="pt-1">
                                            <h2 className="text-2xl font-bold mb-4 text-foreground">{section.title}</h2>
                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Soft Divider (except for last item) */}
                                    {idx < sections.length - 1 && (
                                        <div className="h-px bg-border w-full mt-12 mb-2"></div>
                                    )}
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.4}>
                        <div className="mt-16 text-center text-sm text-muted-foreground">
                            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
