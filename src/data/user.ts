"use server";
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });
        if (user) return user
        return null
    } catch {
        return null;
    }
}

export const getUserById = async (id: string | undefined) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        if (user) return user;
    } catch {
        return null;
    }
}