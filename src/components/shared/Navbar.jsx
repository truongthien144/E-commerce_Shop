"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ShoppingCart, PawPrint, Search, User as UserIcon, LogOut, ClipboardList, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { useCart } from '../cart/CartContext';

function NavbarContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category');
    
    const { items, isMounted, user, refreshUser } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const categories = [
        { id: '1', slug: 'accessories', name: 'Accessories' },
        { id: '2', slug: 'memorials', name: 'Memorials' }
    ];

    const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/';
    };

    const NavLink = ({ href, children, isActive }) => {
        return (
            <Link 
                href={href} 
                className={`relative group px-2 py-2 text-[15px] font-medium transition-colors hover:text-primary whitespace-nowrap ${isActive ? 'text-primary' : 'text-foreground/80'}`}
            >
                {children}
                <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-primary transform origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
        );
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-[72px] items-center justify-between gap-4 relative">
                
                {/* LEFT: Logo */}
                {/* <div className="flex items-center shrink-0 w-[180px]">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <PawPrint className="h-6 w-6 text-primary" />
                        </div>
                        <span className="hidden sm:inline-block text-2xl font-black tracking-tight text-foreground">Pawlio</span>
                    </Link>
                </div> */}
                <div className="flex items-center shrink-0 w-[180px] sm:w-[220px] xl:w-[280px]">
                <Link href="/" className="flex items-center gap-2 group">

                    {/* Logo icon */}
                    <div className="bg-primary/10 rounded-xl overflow-hidden group-hover:bg-primary/20 transition-colors w-10 h-10 flex items-center justify-center">
                        <Image
                            src="/home/logo.png"
                            alt="Pawlio"
                            width={40}
                            height={40}
                            className="object-cover rounded-xl"
/>
                    </div>

                    {/* Text */}
                    <span className="hidden sm:inline-block text-lg md:text-xl font-black tracking-tight text-primary">
                    Pawlio Pet Shop
                    </span>

                </Link>
                </div>

                {/* CENTER: Navigation Links */}
                <nav className="hidden xl:flex flex-1 items-center justify-center gap-8 overflow-x-auto no-scrollbar mx-4">
                    <NavLink href="/" isActive={pathname === '/'}>Home</NavLink>
                    {categories.map((cat) => (
                        <NavLink 
                            key={cat.id} 
                            href={`/products?category=${cat.slug}`}
                            isActive={pathname === '/products' && currentCategory === cat.slug}
                        >
                            {cat.name}
                        </NavLink>
                    ))}
                    <NavLink href="/products" isActive={pathname === '/products' && !currentCategory}>All products</NavLink>
                </nav>

                {/* RIGHT: Icons & Actions */}
                <div className="flex items-center justify-end gap-2 sm:gap-4 shrink-0 w-auto xl:w-[280px]">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setShowSearch(!showSearch)} 
                        className="text-foreground/80 hover:text-primary transition-colors hover:bg-accent/50 rounded-full h-10 w-10 cursor-pointer"
                    >
                        {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                    </Button>

                    {/* Dropdown Search Overlay */}
                    {showSearch && (
                        <div className="absolute top-[72px] right-0 w-full sm:w-[400px] bg-background border shadow-2xl rounded-b-xl p-4 animate-in fade-in slide-in-from-top-2 z-50">
                            <form onSubmit={handleSearch} className="relative flex gap-2">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    autoFocus
                                    type="search"
                                    placeholder="Search for toys, food, memorials..."
                                    className="w-full pl-10 bg-accent/30 border-muted-foreground/20 rounded-full focus-visible:ring-primary"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button type="submit" size="default" className="rounded-full px-6 cursor-pointer">Search</Button>
                            </form>
                        </div>
                    )}

                    <div className="flex items-center gap-1 sm:gap-2">
                        {user ? (
                            <>
                                <Link href="/orders" className="hidden sm:block">
                                    <Button variant="ghost" size="icon" title="My Orders" className="text-foreground/80 hover:text-primary rounded-full h-10 w-10 cursor-pointer">
                                        <ClipboardList className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/30 rounded-full border border-accent/60 ml-1">
                                    <UserIcon className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-semibold hidden sm:inline text-foreground max-w-[100px] truncate">
                                        {user.name.split(' ')[0]}
                                    </span>
                                    <Separator orientation="vertical" className="h-4 mx-1 hidden sm:block bg-muted-foreground/30" />
                                    <button
                                        onClick={handleLogout}
                                        className="p-1 hover:text-destructive transition-colors text-foreground/70 cursor-pointer"
                                        title="Logout"
                                        type="button"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary rounded-full h-10 w-10 cursor-pointer" title="Login">
                                        <UserIcon className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </>
                        )}

                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative group text-foreground/80 hover:text-primary transition-colors hover:bg-accent/50 rounded-full h-10 w-10 cursor-pointer">
                                <ShoppingCart className="h-5 w-5" />
                                {isMounted && cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground transform group-hover:scale-110 transition-transform">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Mobile Navigation Scroll Area */}
            <div className="xl:hidden w-full overflow-x-auto no-scrollbar py-3 border-t">
                <nav className="flex justify-center space-x-8 min-w-max px-2">
                    <NavLink href="/" isActive={pathname === '/'}>Home</NavLink>
                    {categories.map((cat) => (
                        <NavLink 
                            key={cat.id} 
                            href={`/products?category=${cat.slug}`}
                            isActive={pathname === '/products' && currentCategory === cat.slug}
                        >
                            {cat.name}
                        </NavLink>
                    ))}
                    <NavLink href="/products" isActive={pathname === '/products' && !currentCategory}>All products</NavLink>
                </nav>
            </div>
        </div>
    );
}

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 shadow-sm">
            <Suspense fallback={<div className="h-[72px] w-full" />}>
                <NavbarContent />
            </Suspense>
        </header>
    );
}
