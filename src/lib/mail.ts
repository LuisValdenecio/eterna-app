import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email : string, 
    token : string
) => {
    const confirmLink = `${process.env.APP_BASE_URL}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "viterbidesk@viterbideks.com",
        to: email,
        subject: "Viterbideks - Email verification",
        html : `
            <p>Click <a href="${confirmLink}"> to confirm email.</a></p>
        `
    });
}
