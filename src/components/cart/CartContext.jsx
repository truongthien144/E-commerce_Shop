"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useToast } from '../shared/Toast';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [user, setUser] = useState(null);
    const { addToast } = useToast();

    const refreshUser = useCallback(async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                return data.user;
            } else {
                setUser(null);
                return null;
            }
        } catch (err) {
            console.error('Error refreshing user:', err);
            setUser(null);
            return null;
        }
    }, []);

    // Fetch user on mount
    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    // Initial load and sync
    useEffect(() => {
        setIsMounted(true);
        const loadCart = async () => {
            // Priority 1: User Database Cart
            // Priority 2: LocalStorage (Guest)

            const localCart = localStorage.getItem('pawlio_cart');
            const guestItems = localCart ? JSON.parse(localCart) : [];

            if (user) {
                const res = await fetch('/api/cart');
                const data = await res.json();
                const dbItems = data.items || [];

                // Merge logic: Add guest items to DB cart
                if (guestItems.length > 0) {
                    const mergedItems = [...dbItems];
                    guestItems.forEach(guestItem => {
                        const existing = mergedItems.find(i =>
                            i.product.id === guestItem.product.id &&
                            i.variant?.id === guestItem.variant?.id &&
                            JSON.stringify(i.personalization) === JSON.stringify(guestItem.personalization)
                        );
                        if (existing) {
                            existing.quantity += guestItem.quantity;
                        } else {
                            mergedItems.push(guestItem);
                        }
                    });
                    setItems(mergedItems);
                    // Sync merged back to DB
                    await fetch('/api/cart', {
                        method: 'POST',
                        body: JSON.stringify({ items: mergedItems }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    localStorage.removeItem('pawlio_cart');
                    addToast("Your guest cart has been merged with your account!", "success");
                } else {
                    setItems(dbItems);
                }
            } else {
                setItems(guestItems);
            }
        };

        if (isMounted) {
            loadCart();
        }
    }, [user, isMounted]);

    // Save Guest Cart or Sync logged-in cart
    useEffect(() => {
        if (!isMounted) return;

        if (!user) {
            localStorage.setItem('pawlio_cart', JSON.stringify(items));
        } else {
            // Optionally throttle this sync
            const sync = async () => {
                await fetch('/api/cart', {
                    method: 'POST',
                    body: JSON.stringify({ items }),
                    headers: { 'Content-Type': 'application/json' }
                });
            };
            sync();
        }
    }, [items, user, isMounted]);

    const addItem = (item) => {
        setItems((prev) => {
            const existing = prev.find(i =>
                i.product.id === item.product.id &&
                i.variant?.id === item.variant?.id &&
                JSON.stringify(i.personalization) === JSON.stringify(item.personalization)
            );

            if (existing) {
                return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
            }

            const cartId = Date.now().toString() + Math.random().toString(36).substring(7);
            return [...prev, { ...item, cartId }];
        });
    };

    const removeItem = (cartId) => {
        setItems((prev) => prev.filter((item) => item.cartId !== cartId));
    };

    const updateQuantity = (cartId, quantity) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
        );
    };

    const clearCart = useCallback(() => {
        setItems([]);
        if (!user) localStorage.removeItem('pawlio_cart');
    }, [user]);

    const cartTotal = items.reduce((total, item) => {
        const price = item.variant ? item.variant.price : item.product.basePrice;
        return total + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartTotal, isMounted, user, refreshUser }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
