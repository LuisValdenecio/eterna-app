import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `${process.env.APP_BASE_URL}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
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
        from: "onboarding@resend.dev",
        to: email,
        subject: "Viterbideks - Email verification",
        html: `
            <p>Click <a href="${confirmLink}"> to confirm email.</a></p>
        `
    });
}
