'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { NewPasswordSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { newPassword } from '@/actions/new-password';
import Link from 'next/link';

export default function NewPasswordForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        })
    };

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">New Password</CardTitle>
                    <CardDescription>Please type in your new password, it must adhere to our security protocols.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-4">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled={isPending} type="password"></Input>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    Reset password
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
