import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import SortDropdown from "@/components/product/SortDropdown";

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
    searchParams,
}) {
    const params = await searchParams;
    const categoryFilter = params.category;
    const sortFilter = params.sort || 'newest';

    let orderBy = { createdAt: "desc" };
    if (sortFilter === 'price-asc') orderBy = { basePrice: 'asc' };
    else if (sortFilter === 'price-desc') orderBy = { basePrice: 'desc' };
    else if (sortFilter === 'name-asc') orderBy = { name: 'asc' };
    else if (sortFilter === 'name-desc') orderBy = { name: 'desc' };

    const products = await prisma.product.findMany({
        where: categoryFilter ? {
            category: {
                slug: categoryFilter
            }
        } : undefined,
        orderBy: orderBy,
        include: { category: true }
    });

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <aside className="hidden lg:block w-64 shrink-0 p-6 bg-muted/30 rounded-xl">
                    <h2 className="font-bold text-lg mb-4">Categories</h2>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/products" className={`hover:text-primary transition-colors ${!categoryFilter ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                                All Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/products?category=accessories" className={`hover:text-primary transition-colors ${categoryFilter === 'accessories' ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                                Accessories
                            </Link>
                        </li>
                        <li>
                            <Link href="/products?category=memorials" className={`hover:text-primary transition-colors ${categoryFilter === 'memorials' ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                                Memorials
                            </Link>
                        </li>
                    </ul>
                </aside>

                <main className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-foreground">
                            {categoryFilter === 'accessories' ? 'Accessories' : categoryFilter === 'memorials' ? 'Memorials & Keepsakes' : 'All Products'}
                        </h1>
                        <SortDropdown sortFilter={sortFilter} categoryFilter={categoryFilter} />
                    </div>

                    {products.length === 0 ? (
                        <div className="p-12 text-center bg-muted/20 rounded-xl">
                            <p className="text-muted-foreground">No products found for this category.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                            {products.map((product) => (
                                <Card key={product.id} className="overflow-hidden group flex flex-col hover:border-primary/50 transition-colors">
                                    <Link href={`/products/${product.slug}`} className="block relative aspect-square bg-muted">
                                        <img
                                            src={product.imageUrl || "/api/placeholder/400/400"}
                                            alt={product.name}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                    <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
                                        <h3 className="text-sm sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-none">
                                            <Link href={`/products/${product.slug}`}>{product.name}</Link>
                                        </h3>
                                        <p className="hidden md:block text-muted-foreground text-sm line-clamp-2 mb-4">
                                            {product.description}
                                        </p>
                                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                                            <span className="text-base sm:text-lg font-bold text-primary">${product.basePrice.toFixed(2)}</span>
                                            <Link href={`/products/${product.slug}`}>
                                                <Button variant="ghost" size="sm" className="cursor-pointer font-semibold px-0 sm:px-2 hover:bg-transparent hover:text-primary">
                                                    Customize →
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
