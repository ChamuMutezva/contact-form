"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

const FormSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email(),
    type: z.enum(["general", "support"], {
        required_error: "You need to select a notification type.",
    }),
    message: z.string().min(20, {
        message: "Message must be at least 20 characters.",
    }),
    consent: z
        .boolean({
            required_error: "You must agree to be contacted.",
        })
        .refine((val) => val === true, {
            message: "To submit this form, please consent to be contacted.",
        }),
});

export default function Home() {
    const toast = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            type: "general",
            message: "",
            consent: false,
        },
    });
    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        toast.toast({
            title: "Message sent!",
            description: `Thank you ${data.firstName} for completing the form, we will be in touch soon`,
        });
        form.reset();
    }
    return (
        <main className="max-w-[42rem] w-full bg-[hsl(var(--white))] rounded-2xl mx-4 my-8 p-6 sm:p-10">
            <h2 className="text-preset-3 font-bold">Contact us</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4 mt-7 w-full sm:grid-cols-2"
                >
                    {/*FIRST NAME */}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel className="text-base">
                                    First Name *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Chamu"
                                        className="py-6"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* LAST NAME */}
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel className="text-base">
                                    Last Name *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Mutezva"
                                        className="py-6"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* EMAIL */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel className="text-base">
                                    Email address *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="example@xyz.com"
                                        autoComplete="email"
                                        className="py-6"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* QUERY TYPE */}
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel className="text-base">
                                    Query type *
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center"
                                    >
                                        <FormItem className="flex-1 flex items-center space-x-3 space-y-0 border rounded-md px-2 py-4">
                                            <FormControl>
                                                <RadioGroupItem value="general" />
                                            </FormControl>
                                            <FormLabel
                                                className="font-normal text-preset-2"
                                                htmlFor="general"
                                            >
                                                General enquiry
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex-1 flex items-center space-x-3 space-y-0 border rounded-md px-2 py-4">
                                            <FormControl>
                                                <RadioGroupItem value="support" />
                                            </FormControl>
                                            <FormLabel
                                                className="font-normal text-preset-2"
                                                htmlFor="support"
                                            >
                                                Support request
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* MESSAGE */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel className="text-base">
                                    Message *
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={5}
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CONSENT */}
                    <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <div className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-base">
                                            I consent to be contacted by the
                                            team
                                        </FormLabel>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="col-span-2 text-preset-2 py-[30px] text-[hsl(var(--white))] bg-[hsl(var(--green-600))]"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
            <Toaster />
        </main>
    );
}
