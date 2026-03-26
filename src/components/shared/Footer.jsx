import Link from 'next/link';
import Image from 'next/image';
import { PawPrint, ChevronDown } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-4 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-primary/10 rounded-xl overflow-hidden w-10 h-10 flex items-center justify-center">
      <Image
        src="/home/logo.png"
        alt="Pawlio"
        width={40}
        height={40}
        className="object-cover rounded-xl"
      />
    </div>

    {/* Text */}
    <span className="text-xl font-bold tracking-tight text-primary text-center">
      Pawlio Pet Shop
    </span>

                        </Link>
                        <p className="text-sm text-muted-foreground mt-2">
                            Warm, personalized keepsakes and accessories for your beloved furry friends. Because every pet deserves to be remembered.
                        </p>
                    </div>

                    {/* DESKTOP VIEW */}
                    <div className="hidden md:block">
                        <h3 className="font-semibold mb-4 text-primary">Shop</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                            <li><Link href="/products?category=accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
                            <li><Link href="/products?category=memorials" className="hover:text-primary transition-colors">Memorials</Link></li>
                        </ul>
                    </div>

                    <div className="hidden md:block">
                        <h3 className="font-semibold mb-4 text-primary">Company</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div className="hidden md:block">
                        <h3 className="font-semibold mb-4 text-primary">Legal</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* MOBILE VIEW ACCORDIONS */}
                <div className="md:hidden flex flex-col mt-8 divide-y divide-border">
                    <details className="group py-4">
                        <summary className="font-semibold text-primary flex justify-between items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            Shop
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <ul className="flex flex-col gap-3 text-sm text-muted-foreground mt-4 pb-2">
                            <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                            <li><Link href="/products?category=accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
                            <li><Link href="/products?category=memorials" className="hover:text-primary transition-colors">Memorials</Link></li>
                        </ul>
                    </details>
                    
                    <details className="group py-4">
                        <summary className="font-semibold text-primary flex justify-between items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            Company
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <ul className="flex flex-col gap-3 text-sm text-muted-foreground mt-4 pb-2">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </details>

                    <details className="group py-4">
                        <summary className="font-semibold text-primary flex justify-between items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            Legal
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <ul className="flex flex-col gap-3 text-sm text-muted-foreground mt-4 pb-2">
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </details>
                </div>

                <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Pawlio Petshop. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span>🐾 Crafted with love</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
