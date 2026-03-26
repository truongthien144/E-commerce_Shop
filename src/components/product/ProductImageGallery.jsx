"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export function ProductImageGallery({ product, versions }) {
    // Flatten all images logically if versions present, otherwise fallback to standard image
    // If we have versions from the file system, use the first version's images initially
    
    // In many products, the user might want a single master list of images. 
    // We'll collect the thumbnail choices.
    const hasVersions = versions && versions.length > 0;
    
    // Default single image array if no versions found in FS
    const defaultImages = [product.imageUrl || "/api/placeholder/600/600"];
    
    // If we have versions, by default pick the first version's first image
    const [activeVersionIndex, setActiveVersionIndex] = useState(0);
    
    const currentImages = hasVersions 
        ? versions[activeVersionIndex].images 
        : defaultImages;

    const [mainImage, setMainImage] = useState(currentImages[0]);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    
    // To navigate modal
    const [modalImageIndex, setModalImageIndex] = useState(0);

    // Update main image when version changes
    const handleVersionChange = (index) => {
        setActiveVersionIndex(index);
        setMainImage(versions[index].images[0]);
    };

    const openZoom = (imgPath) => {
        const idx = currentImages.indexOf(imgPath);
        setModalImageIndex(idx !== -1 ? idx : 0);
        setIsZoomOpen(true);
    };

    const nextImage = () => {
        setModalImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setModalImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image View */}
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-muted border flex items-center justify-center group cursor-zoom-in" onClick={() => openZoom(mainImage)}>
                <img
                    src={mainImage}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-foreground" />
                </div>
            </div>

            {/* Version / Sample Selector (Optional if multiple versions found) */}
            {hasVersions && versions.length > 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {versions.map((ver, idx) => (
                        <button
                            key={ver.id}
                            onClick={() => handleVersionChange(idx)}
                            className={cn(
                                "cursor-pointer text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
                                activeVersionIndex === idx 
                                ? "bg-primary text-primary-foreground border-primary" 
                                : "bg-background text-foreground hover:bg-muted"
                            )}
                        >
                            {ver.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Thumbnails */}
            {currentImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2 sm:gap-4 mt-2">
                    {currentImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setMainImage(img)}
                            className={cn(
                                "cursor-pointer aspect-square relative rounded-lg overflow-hidden border-2 transition-all",
                                mainImage === img ? "border-primary opacity-100" : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="object-cover w-full h-full" />
                        </button>
                    ))}
                </div>
            )}

            {/* Zoom Modal */}
            <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black border-none flex items-center justify-center">
                    <DialogTitle className="sr-only">Product Image Zoom</DialogTitle>
                    <button 
                        onClick={() => setIsZoomOpen(false)}
                        className="cursor-pointer absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    
                    <div className="relative w-full h-full flex items-center justify-center">
                        {currentImages.length > 1 && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="cursor-pointer absolute left-4 z-50 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white transition hidden sm:block"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                        )}
                        
                        <img 
                            src={currentImages[modalImageIndex]} 
                            alt={`${product.name} zoomed`} 
                            className="max-w-full max-h-[85vh] object-contain"
                        />

                        {currentImages.length > 1 && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="cursor-pointer absolute right-4 z-50 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white transition hidden sm:block"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        )}
                    </div>
                    
                    {/* Mobile Navigation controls */}
                    {currentImages.length > 1 && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 sm:hidden z-50">
                             <button onClick={prevImage} className="cursor-pointer p-2 bg-black/50 rounded-full text-white">
                                <ChevronLeft className="w-6 h-6" />
                             </button>
                             <button onClick={nextImage} className="cursor-pointer p-2 bg-black/50 rounded-full text-white">
                                <ChevronRight className="w-6 h-6" />
                             </button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
