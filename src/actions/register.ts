"use server";

import * as z from "zod";
import bcryptjs from "bcryptjs"
import { db } from "@/lib/db";

import { SignupSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof SignupSchema>) => {
    const validatedFields = SignupSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        return { error: "Email already in use!" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const verificationToken = await generateVerificationToken(email);

    // TODO: Send verification token email

    return { success: "Confirmation email sent!" }
}