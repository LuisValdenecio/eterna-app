import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(1, {
        message: "Password is required",
    })
})

export const SignupSchema = z.object({
    name: z.string().min(1, {
        message: 'type in your name'
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    })
});

export const PasswordResetSchema = z.object({
    email: z.string().email({
        message: "Email is requried"
    })
});

export const TeamSchema = z.object({
    name: z.string().min(1, {
        message: "Please, type in the team name",
    })
});

export const MemberSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

