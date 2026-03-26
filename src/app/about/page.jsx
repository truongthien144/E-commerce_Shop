import { Heart, Star, Award, Sparkles, Smile, ShieldCheck, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata = {
    title: "About Us | Pawlio",
    description: "Learn more about Pawlio and our mission to provide the best personalized pet products.",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">

                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-position-[center_30%] brightness-95"
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2070&auto=format&fit=crop)"
                    }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-background/80 via-background/60 to-background" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center justify-center p-3 bg-primary rounded-full mb-6 backdrop-blur-sm">
                            <Heart className="w-8 h-8 text-primary-foreground" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
                            Made With Love for Pets
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Creating meaningful, personalized memories for pets and their owners.
                            Because they aren&apos;t just pets—they&apos;re family.
                        </p>
                    </FadeIn>
                </div>
            </section>


            {/* Our Story */}
            <section className="py-20 bg-linear-to-br from-yellow-200/90 via-orange-200/80 to-background">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <h2 className="text-3xl font-bold">Our Story</h2>

                            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>

                            <p className="text-lg text-muted-foreground leading-relaxed mt-8">
                                Welcome to Pawlio, where we believe every pet deserves to be celebrated.
                                Our journey started with a simple idea: that the bond between pets and
                                their human companions is one of the most special connections in the world.
                            </p>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We specialize in high-quality, personalized pet products that honor
                                this unique relationship. From custom collars to beautiful memorial plaques,
                                every item we create is crafted with profound love and meticulous attention
                                to detail.
                            </p>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our mission is to provide you with beautiful ways to showcase your devotion
                                to your furry family members. Every Pawlio product is designed to be as unique
                                as the pet it celebrates.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>


            {/* Brand Highlights */}
            <section className="relative py-16 overflow-hidden">

                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-position-[center_25%] opacity-25"
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop)"
                    }}
                />

                <div className="container mx-auto px-4 relative z-10">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {[
                            { icon: Users, stat: "10,000+", label: "Happy Pet Parents" },
                            { icon: Star, stat: "100%", label: "Custom Personalized" },
                            { icon: ShieldCheck, stat: "Forever", label: "Lasting Memories" }
                        ].map((item, idx) => (

                            <FadeIn key={idx} delay={idx * 0.1} className="text-center">

                                <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-background/90 backdrop-blur-sm border border-primary/10 transition-all duration-300 hover:bg-muted/40 hover:border-primary/30 cursor-pointer hover:shadow-lg hover:shadow-primary/5">

                                    <item.icon className="w-10 h-10 text-primary mb-4 opacity-80" />

                                    <h3 className="text-4xl lg:text-5xl font-bold mb-2 text-foreground">
                                        {item.stat}
                                    </h3>

                                    <p className="text-lg font-medium text-muted-foreground uppercase tracking-wider">
                                        {item.label}
                                    </p>

                                </div>

                            </FadeIn>

                        ))}

                    </div>

                </div>
            </section>


            {/* Our Values */}
            <section className="relative py-20 border-y border-border/50 overflow-hidden">

                {/* Paw pattern background */}
                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/90 to-background opacity-80"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold relative inline-block">
                                Our Core Values
                                <span className="absolute -bottom-4 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {[
                            {
                                icon: Heart,
                                title: "Love for Pets",
                                desc: "At the heart of everything we do is a profound love for animals of all shapes and sizes."
                            },
                            {
                                icon: Award,
                                title: "Quality Craftsmanship",
                                desc: "We pride ourselves on using premium materials and meticulous engraving techniques."
                            },
                            {
                                icon: Sparkles,
                                title: "Meaningful Memories",
                                desc: "We create keepsakes that help you cherish and capture the spirit of your pet forever."
                            },
                            {
                                icon: Smile,
                                title: "Customer Happiness",
                                desc: "Your satisfaction is our absolute priority."
                            }
                        ].map((value, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="bg-background/80 backdrop-blur-sm border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer group">

                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                        <value.icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-xl font-semibold mb-3">
                                        {value.title}
                                    </h3>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {value.desc}
                                    </p>

                                </div>
                            </FadeIn>
                        ))}

                    </div>
                </div>
            </section>


        </div>
    );
}