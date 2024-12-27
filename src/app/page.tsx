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
    consent: z.boolean().default(false).optional(),
});

export default function Home() {
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
    }
    return (
        <div className="max-w-[42rem] w-full bg-[hsl(var(--white))] rounded mx-4 my-8 p-6 sm:p-10">
            <h2>Contact us</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4 w-full sm:grid-cols-2"
                >
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel>First Name *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Chamu" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel>Last Name *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mutezva" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Email address *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="example@xyz.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Query type *</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:items-center space-y-1"
                                    >
                                        <FormItem className="flex-1 items-center space-x-3 space-y-0 border rounded-md p-2">
                                            <FormControl>
                                                <RadioGroupItem value="general" id="general"/>
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                General enquiry
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex-1 items-center space-x-3 space-y-0 border rounded-md p-2">
                                            <FormControl>
                                                <RadioGroupItem value="support" id="support" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Support request
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Message *</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                            <FormItem className="flex flex-row col-span-2 items-start space-x-3 space-y-0 p-4">
                                <FormControl>
                                    <Checkbox
                                    id="consent"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        I consent to be contacted by the team
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="col-span-2 bg-[hsl(var(--green-600))]"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
