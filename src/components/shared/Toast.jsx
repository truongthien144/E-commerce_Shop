"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastContext = createContext(undefined)

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    const addToast = useCallback((message, type = "info") => {
        const id = Date.now() + Math.random() // Extra safety for duplicate quick triggers
        setToasts((prev) => [...prev, { id, message, type }])
        setTimeout(() => removeToast(id), 5000)
    }, [removeToast])

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={cn(
                            "pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg animate-in slide-in-from-right-full duration-300",
                            toast.type === "success" && "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300",
                            toast.type === "error" && "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300",
                            toast.type === "info" && "bg-background border-border text-foreground"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            {toast.type === "success" && <CheckCircle2 className="h-5 w-5" />}
                            {toast.type === "error" && <XCircle className="h-5 w-5" />}
                            {toast.type === "info" && <AlertCircle className="h-5 w-5" />}
                            <p className="text-sm font-medium">{toast.message}</p>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                        >
                            <X className="h-4 w-4 opacity-50 hover:opacity-100" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error("useToast must be used within ToastProvider")
    return context
}
