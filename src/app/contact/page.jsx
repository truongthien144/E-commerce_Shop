import { Mail, Clock, Store, MapPin, Send } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata = {
    title: "Contact Us | Pawlio",
    description: "Get in touch with the Pawlio team.",
};

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-b from-background to-muted/10">
            {/* Hero Section */}
            <section className="relative py-20 bg-linear-to-br from-primary/10 via-background to-muted/20 border-b border-border/50">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
                            Friendly Support
                        </h1>
                        <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
                            Have a question about your order, a product, or just want to say hello? 
                            We&apos;d love to hear from you.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-linear-to-br from-primary via-primary/90 to-primary/70">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                        
                        {/* Contact Information Cards */}
                        <div className="lg:col-span-2 space-y-6">
                            <FadeIn delay={0.1}>
                                <div className="p-6 bg-background/80 backdrop-blur-sm border rounded-2xl flex items-start gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/50 cursor-pointer group">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground mb-1">Email Support</h3>
                                        <p className="text-muted-foreground text-sm mb-2">Typically replies within 24 hours.</p>
                                        <a href="mailto:support@pawlio.com" className="text-primary font-medium hover:underline">support@pawlio.com</a>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <div className="p-6 bg-background/80 backdrop-blur-sm border rounded-2xl flex items-start gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/50 cursor-pointer group">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground mb-1">Customer Service Hours</h3>
                                        <p className="text-muted-foreground text-sm">Monday - Friday</p>
                                        <p className="text-muted-foreground text-sm">9:00 AM - 5:00 PM (EST)</p>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <div className="p-6 bg-background/80 backdrop-blur-sm border rounded-2xl flex items-start gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/50 cursor-pointer group">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                        <Store className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground mb-1">Store Type</h3>
                                        <p className="text-muted-foreground text-sm">We operate entirely online to serve pet lovers exclusively across the globe directly from our workshops.</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <FadeIn delay={0.2}>
                                <div className="bg-background/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-primary/10 shadow-xl shadow-primary/5">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold mb-2 text-center">Send us a Message</h2>
                                        <p className="text-muted-foreground">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                                    </div>

                                    <form className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                                                <input type="text" id="name" className="w-full flex h-12 rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                                                <input type="email" id="email" className="w-full flex h-12 rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all" placeholder="your@email.com" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                                            <input type="text" id="subject" className="w-full flex h-12 rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all" placeholder="Order Inquiry" />
                                        </div>
                                        <div className="space-y-">
                                            <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                                            <textarea id="message" rows={6} className="w-full flex rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all resize-none" placeholder="How can we help you today?"></textarea>
                                        </div>
                                       <div className="flex justify-center md:justify-end">
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 w-full md:w-auto shadow-sm hover:shadow-md"
                                            >
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Message
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
