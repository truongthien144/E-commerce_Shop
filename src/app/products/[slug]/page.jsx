import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import { ProductForm } from "@/components/product/ProductForm";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { Card, CardContent } from "@/components/ui/card";
import { getProductImages } from "@/lib/getProductImages";

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({
    params
}) {
    const resolvedParams = await params;

    const productData = await prisma.product.findUnique({
        where: { slug: resolvedParams.slug },
        include: {
            category: true,
            variants: true,
        }
    });

    if (!productData) {
        notFound();
    }
    const productImagesVersions = getProductImages(productData.slug);

    const product = {
        id: productData.id,
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        basePrice: productData.basePrice,
        imageUrl: productData.imageUrl,
        categoryId: productData.categoryId,
        isMemorial: productData.isMemorial,
        requiresText: productData.requiresText
    };

    const variants = productData.variants.map((v) => ({
        id: v.id,
        productId: v.productId,
        name: v.name,
        price: v.price
    }));

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
                {/* Dynamic Image Gallery Wrapper */}
                <ProductImageGallery product={product} versions={productImagesVersions} />

                <div className="flex flex-col">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
                        {product.name}
                    </h1>

                    <div className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary">
                        ${product.basePrice.toFixed(2)}
                    </div>

                    <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground mb-8">
                        <p>{product.description}</p>
                    </div>

                    <div className="bg-muted/30 rounded-xl p-6 border mb-8">
                        <ProductForm product={product} variants={variants} />
                    </div>

                    <div className="text-sm text-muted-foreground mt-4 space-y-2 pb-8 border-b">
                        <p>🚚 Free shipping on orders over $50</p>
                        <p>✨ Handcrafted & Personalized with care</p>
                        <p>✅ 100% Satisfaction Guarantee</p>
                    </div>
                </div>
            </div>

            {/* Featured / Suggested Products Section */}
            <FeaturedProducts currentProductId={product.id} />
        </div>
    );
}

async function FeaturedProducts({ currentProductId }) {
    // Just fetch 4 products excluding the current one to naturally mix categories
    const suggestedProducts = await prisma.product.findMany({
        where: { id: { not: currentProductId } },
        take: 4,
        include: { category: true }
    });

    if (suggestedProducts.length === 0) return null;

    return (
        <div className="mt-24">
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestedProducts.map((p) => (
                    <Card key={p.id} className="overflow-hidden group flex flex-col hover:border-primary/50 transition-colors">
                        <Link href={`/products/${p.slug}`} className="block relative aspect-square bg-muted">
                            <img
                                src={p.imageUrl || "/api/placeholder/400/400"}
                                alt={p.name}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                        <CardContent className="p-4 flex flex-col flex-1">
                            <h3 className="font-bold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                <Link href={`/products/${p.slug}`}>{p.name}</Link>
                            </h3>
                            <p className="text-muted-foreground text-xs line-clamp-1 mb-3">
                                {p.category.name}
                            </p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="font-bold">${p.basePrice.toFixed(2)}</span>
                                <Link href={`/products/${p.slug}`} className="text-xs font-semibold text-primary">
                                    View
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
