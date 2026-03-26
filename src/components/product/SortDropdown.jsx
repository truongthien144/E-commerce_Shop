"use client";

import { useRouter } from "next/navigation";

export default function SortDropdown({ sortFilter, categoryFilter }) {
    const router = useRouter();

    const handleSortChange = (e) => {
        const value = e.target.value;
        const params = new URLSearchParams();
        if (categoryFilter) params.set("category", categoryFilter);
        params.set("sort", value);
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-muted-foreground whitespace-nowrap">Sort by:</label>
            <select 
                id="sort"
                name="sort"
                value={sortFilter}
                onChange={handleSortChange}
                className="h-10 px-3 py-2 rounded-md border border-input bg-background/50 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary w-[160px] sm:w-[200px]"
            >
                <option value="newest">Latest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical: A to Z</option>
                <option value="name-desc">Alphabetical: Z to A</option>
            </select>
        </div>
    );
}
