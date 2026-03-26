import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
            where: { email }
        });

        if (!existingSubscriber) {
            await prisma.newsletterSubscriber.create({
                data: { email }
            });
        }

        return NextResponse.json(
            { message: "Subscribed successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
