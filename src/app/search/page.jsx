import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function SearchPage({ searchParams }) {
    const query = (await searchParams).q || "";

    // Perform search using Prisma
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query } }, // Case-insensitive by default in SQLite but let's be safe
                { description: { contains: query } },
                { category: { name: { contains: query } } }
            ]
        },
        include: {
            category: true,
            variants: {
                orderBy: { price: 'asc' },
                take: 1
            }
        }
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
                <p className="text-muted-foreground mt-2">
                    {products.length} {products.length === 1 ? 'result' : 'results'} found for &quot;{query}&quot;
                </p>
            </div>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="rounded-full bg-accent p-6 mb-4">
                        <SearchIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">No products found</h2>
                    <p className="text-muted-foreground mt-2 max-w-sm">
                        Try adjusting your search or category to find what you&apos;re looking for.
                    </p>
                    <Button asChild className="mt-6 cursor-pointer">
                        <Link href="/products">Browse All Products</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => {
                        const price = product.variants[0]?.price || product.basePrice;

                        return (
                            <Link key={product.id} href={`/products/${product.slug}`} className="group">
                                <Card className="h-full overflow-hidden transition-all hover:shadow-md border-muted/40">
                                    <div className="aspect-square relative overflow-hidden bg-accent/30">
                                        <img
                                            src={product.imageUrl || "/api/placeholder/400/400"}
                                            alt={product.name}
                                            className="object-cover w-full h-full transition-transform group-hover:scale-105"
                                        />
                                        {product.isMemorial && (
                                            <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                                                MEMORIAL
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                                            {product.category.name}
                                        </div>
                                        <h3 className="font-bold text-lg leading-tight line-clamp-1">{product.name}</h3>
                                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2 min-h-[40px]">
                                            {product.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                                        <div className="font-bold text-lg text-primary">${price.toFixed(2)}</div>
                                        <Button size="sm" variant="ghost" className="cursor-pointer text-xs hover:bg-primary hover:text-primary-foreground transition-all">
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    );
}

function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}
