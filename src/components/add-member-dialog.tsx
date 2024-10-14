"use client";

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { useState, useTransition } from 'react'

import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import { MemberSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@heroicons/react/16/solid'


export default function AddMemberDialog() {
    let [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof MemberSchema>>({
        resolver: zodResolver(MemberSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = (values: z.infer<typeof MemberSchema>) => {
        console.log(values)
    }

    return (
        <>
            <Button type="button" className='cursor-pointer' onClick={() => setIsOpen(true)}>
                <PlusIcon />
                Add Member
            </Button>
            <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle>Add Team Member</DialogTitle>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <DialogBody>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                disabled={isPending}
                                                placeholder="type your member's email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >

                            </FormField>

                        </DialogBody>
                        <DialogActions>
                            <Button plain onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Create</Button>
                        </DialogActions>
                    </form>
                </Form>
            </Dialog>
        </>
    )
}