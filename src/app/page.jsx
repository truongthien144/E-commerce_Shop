import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Heart, Star, ShieldCheck, Gift } from "lucide-react";
import { NewsletterSection } from "@/components/shared/NewsletterSection";

export const dynamic = 'force-dynamic';

export default async function Home() {
    // Fetch a mix of products for the homepage (1 accessory, 2 memorials)
    const featuredProducts = await prisma.product.findMany({
        where: {
            slug: {
                in: [
                    'Dog-Collar-Personalized',
                    'Personalized-3D-Crystal-Photo-Portrait',
                    'Memorial-Pet-Collar-Sign'
                ]
            }
        },
        take: 3,
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full py-12 md:py-32 overflow-hidden bg-linear-to-tr from-secondary via-primary/20 to-background">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-foreground">
                                    Keepsakes as Unique as <span className="text-primary">Your Best Friend</span>
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground text-base sm:text-lg md:text-xl">
                                    Discover beautifully crafted, personalized accessories and touching memorials for the pets you love.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center md:justify-start">
                                <Link href="/products">
                                    <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                                        Shop Collection
                                    </Button>
                                </Link>
                                <Link href="/products?category=memorials">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto cursor-pointer">
                                        View Memorials
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="mx-auto relative aspect-4/3 overflow-hidden rounded-2xl bg-muted w-full max-w-[500px] border-4 border-white shadow-lg hover:shadow-2xl transition-all duration-300 rotate-1">
                                <Image
                                    src="/home/hero-img.jpg"
                                    alt="Hero Image"
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-106"
                                />
                            </div>
                    </div>
                </div>
            </section>

            {/* Features/Values */}
            <section className="w-full py-12 bg-background border-y">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-border">
                        <div className="flex flex-col items-center space-y-2 p-4">
                            <div className="p-3 bg-primary/10 rounded-full text-primary mb-2">
                                <Heart className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold">Crafted with Love</h3>
                            <p className="text-sm text-muted-foreground">Every piece is personalized just for your pet.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2 p-4">
                            <div className="p-3 bg-primary/10 rounded-full text-primary mb-2">
                                <Star className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold">Premium Quality</h3>
                            <p className="text-sm text-muted-foreground">Durable materials built to last a lifetime.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2 p-4">
                            <div className="p-3 bg-primary/10 rounded-full text-primary mb-2">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold">Safe & Secure</h3>
                            <p className="text-sm text-muted-foreground">Secure payments and guaranteed satisfaction.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2 p-4">
                            <div className="p-3 bg-primary/10 rounded-full text-primary mb-2">
                                <Gift className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold">Perfect Gifts</h3>
                            <p className="text-sm text-muted-foreground">The most thoughtful gift for any pet lover.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="w-full py-8 md:py-16 bg-linear-to-b from-secondary via-primary/20 to-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">Featured Keepsakes</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                            Our most loved personalized products
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-6xl mx-auto">
                        {featuredProducts.map((product) => (
                            <Card key={product.id} className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-xs sm:max-w-sm lg:max-w-none overflow-hidden group flex flex-col hover:border-primary/50 transition-colors mx-auto">
                                <Link href={`/products/${product.slug}`} className="block relative aspect-square bg-muted">
                                    <Image
                                        src={product.imageUrl || "/api/placeholder/400/400"}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>
                                <CardContent className="p-3 sm:p-5 flex flex-col flex-1">
                                    <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-none">
                                        <Link href={`/products/${product.slug}`}>{product.name}</Link>
                                    </h3>
                                    <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 sm:mb-4">
                                        {product.description}
                                    </p>
                                    <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-1 sm:gap-2">
                                        <span className="text-sm sm:text-lg font-bold text-primary">${product.basePrice.toFixed(2)}</span>
                                        <Link href={`/products/${product.slug}`}>
                                            <Button variant="ghost" size="sm" className="font-semibold px-0 sm:px-2 hover:bg-transparent hover:text-primary cursor-pointer text-xs sm:text-sm h-auto py-1">
                                                Customize →
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center mt-12">
                        <Link href="/products">
                            <Button variant="outline" size="lg" className="rounded-full px-8 cursor-pointer hover:text-primary">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Banner */}
           <section className="relative w-full py-16 overflow-hidden bg-linear-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Shop by Category</h2>
                            <p className="text-primary-foreground/90 md:text-lg mb-8 font-medium">
                                Whether you're looking for everyday wear or a beautiful way to remember a friend who crossed the rainbow bridge.
                            </p>
                            <div className="flex flex-col min-[400px]:flex-row gap-2 justify-center md:justify-start">
                                <Link href="/products?category=accessories">
                                    <Button variant="secondary" size="lg" className="w-full sm:w-auto font-bold cursor-pointer">
                                        Everyday Accessories
                                    </Button>
                                </Link>
                                <Link href="/products?category=memorials">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent cursor-pointer border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold">
                                        Pet Memorials
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary-foreground/20 shadow-lg hover:shadow-2xl transition-all duration-300">
                            <Image
                                src="/home/banner.jpeg"
                                alt="Banner Image"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <NewsletterSection />
        </div>
    );
}
