import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "onboarding@resend.dev";

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Vitebidesk - 2FA code",
        html: `
            <p>Your 2FA code is ${token}</p>
        `
    });
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `${process.env.APP_BASE_URL}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Viterbideks - Password reset",
        html: `
            <p>Click <a href="${resetLink}"> to reset password.</a></p>
        `
    });
}

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `${process.env.APP_BASE_URL}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Viterbideks - Email verification",
        html: `
            <p>Click <a href="${confirmLink}"> to confirm email.</a></p>
        `
    });
}
