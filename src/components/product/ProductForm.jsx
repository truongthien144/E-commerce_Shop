"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { useToast } from "@/components/shared/Toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ShoppingCart, X as XIcon } from "lucide-react";

export function ProductForm({
    product,
    variants = []
}) {
    const { addItem } = useCart();
    const { addToast } = useToast();
    const router = useRouter();

    const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id || "");
    const [quantity, setQuantity] = useState(1);
    const [petName, setPetName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [customText, setCustomText] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    const selectedVariant = variants.find(v => v.id === selectedVariantId);
    const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;

    const handleSubmit = (e) => {
        e.preventDefault();

        addItem({
            product,
            variant: selectedVariant,
            quantity,
            personalization: {
                petName: petName || undefined,
                phoneNumber: phoneNumber || undefined,
                customText: customText || undefined,
                photoUrl: photoUrl || undefined,
            }
        });

        addToast("Added to cart successfully!", "success");
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">${currentPrice.toFixed(2)}</span>
            </div>

            {variants.length > 0 && (
                <div className="space-y-3">
                    <Label htmlFor="variant">Size / Option</Label>
                    <Select value={selectedVariantId} onValueChange={setSelectedVariantId} required>
                        <SelectTrigger id="variant">
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            {variants.map(variant => (
                                <SelectItem key={variant.id} value={variant.id}>
                                    {variant.name} (+${(variant.price - product.basePrice).toFixed(2)})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {product.requiresText && !product.isMemorial && (
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-foreground">Personalization Details</h3>
                    <div className="space-y-2">
                        <Label htmlFor="petName">Pet's Name</Label>
                        <Input
                            id="petName"
                            placeholder="e.g. Bella"
                            value={petName}
                            onChange={e => setPetName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number (optional)</Label>
                        <Input
                            id="phoneNumber"
                            placeholder="e.g. 555-0123"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {product.isMemorial && (
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-foreground">Memorial Details</h3>
                    <div className="space-y-2">
                        <Label htmlFor="petNameMem">Pet's Name</Label>
                        <Input
                            id="petNameMem"
                            placeholder="e.g. Max"
                            value={petName}
                            onChange={e => setPetName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="customText">Custom Message (optional)</Label>
                        <Input
                            id="customText"
                            placeholder="Forever in our hearts..."
                            value={customText}
                            onChange={e => setCustomText(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="photoUpload">Upload Pet's Photo</Label>
                        <div className="flex flex-col gap-3">
                            {photoUrl && (
                                <div className="relative w-32 h-32 rounded-lg overflow-hidden border bg-muted">
                                    <img src={photoUrl} alt="Preview" className="object-cover w-full h-full" />
                                    <button
                                        type="button"
                                        onClick={() => setPhotoUrl("")}
                                        className="cursor-pointer absolute top-1 right-1 bg-background/80 rounded-full p-1 shadow-sm hover:bg-background"
                                    >
                                        <XIcon className="h-3 w-3" />
                                    </button>
                                </div>
                            )}
                            <Input
                                id="photoUpload"
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const formData = new FormData();
                                        formData.append("file", file);
                                        const res = await fetch("/api/upload", {
                                            method: "POST",
                                            body: formData,
                                        });
                                        const data = await res.json();
                                        if (data.url) setPhotoUrl(data.url);
                                    }
                                }}
                                required={!photoUrl}
                                className="cursor-pointer file:cursor-pointer file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-3 hover:file:bg-primary/90"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-3 pt-4 border-t">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex items-center gap-4">
                    <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-24"
                    />
                    <Button type="submit" className="w-full cursor-pointer flex-1 gap-2" size="lg" disabled={isAdded}>
                        <ShoppingCart className="h-5 w-5" />
                        {isAdded ? "Added to Cart!" : "Add to Cart"}
                    </Button>
                </div>
            </div>

            {isAdded && (
                <div className="flex gap-2">
                    <Button type="button" variant="secondary" className="w-full cursor-pointer" onClick={() => router.push('/cart')}>
                        View Cart
                    </Button>
                    <Button type="button" variant="outline" className="w-full cursor-pointer" onClick={() => router.push('/products')}>
                        Continue Shopping
                    </Button>
                </div>
            )}
        </form>
    );
}
