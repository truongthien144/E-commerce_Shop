import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import { ToastProvider } from "@/components/shared/Toast";

export const metadata = {
    title: "Pawlio Petshop",
    description: "Browse our warm and uniquely personalized pet collars, ID tags, and memorial keepsakes to celebrate the furry friends you love.",
    icons: {
    icon: "/favicon.ico", 
  }
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body
                className="antialiased min-h-screen flex flex-col"
            >
                <ToastProvider>
                    <CartProvider>
                        <Navbar />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </CartProvider>
                </ToastProvider>
            </body>
        </html>
    );
}
