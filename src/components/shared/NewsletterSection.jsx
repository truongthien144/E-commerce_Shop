"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        
        if (!email) return;

        setLoading(true);

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Thanks for subscribing to Pawlio!");
                setEmail(""); // clear input
            } else {
                toast.error(data.error || "Subscription failed. Please try again.");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full py-8 md:py-14 bg-muted/90 border-t mt-auto">
            <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tighter text-foreground mb-4">
                    Stay Connected With Pawlio
                </h2>
                <p className="text-muted-foreground md:text-lg mb-8">
                    Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                </p>
                
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com" 
                        required
                        className="flex-1 flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button type="submit" size="lg" disabled={loading} className="h-12 w-full sm:w-auto cursor-pointer">
                        {loading ? "Subscribing..." : "Subscribe"}
                    </Button>
                </form>
            </div>
        </section>
    );
}
