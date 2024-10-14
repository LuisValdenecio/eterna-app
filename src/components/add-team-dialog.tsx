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
import { TeamSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@heroicons/react/16/solid'


export default function CreateTeamDialog() {
    let [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof TeamSchema>>({
        resolver : zodResolver(TeamSchema),
        defaultValues: {
            name : ""
        }
    })

    const onSubmit = (values : z.infer<typeof TeamSchema>) => {
        console.log(values)
    }

    return (
        <>
            <Button type="button" className='cursor-pointer' onClick={() => setIsOpen(true)}>
                <PlusIcon />
                Create Team
            </Button>
            <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle>Create Team</DialogTitle>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        >
                        <DialogBody>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                disabled={isPending}
                                                placeholder="type your team's name"
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