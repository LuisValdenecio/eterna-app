"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { PasswordResetSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { passwordReset } from "@/actions/password-reset";

import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";

export default function LoginForm() {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof PasswordResetSchema>>({
        resolver: zodResolver(PasswordResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
        startTransition(async () => {
            passwordReset(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    }

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Password Reset</CardTitle>
                    <CardDescription>
                        Enter your email below to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        disabled={isPending}
                                                        placeholder="m@example.com"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>


                                <Button type="submit" className="w-full" disabled={isPending}>
                                    Send reset email
                                </Button>
                                <FormError message={error} />
                                <FormSuccess message={success} />
                            </div>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm">
                        <Link href="/auth/login" className="underline">
                            Go back to Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
