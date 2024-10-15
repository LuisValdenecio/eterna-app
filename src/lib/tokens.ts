import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existitngToken = await getPasswordResetTokenByEmail(email);

    if (existitngToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existitngToken.id
            }
        });
    }
    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return passwordResetToken;

}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existitngToken = await getVerificationTokenByEmail(email);

    if (existitngToken) {
        await db.verificationToken.delete({
            where: {
                id: existitngToken.id
            },
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return verificationToken;
}

