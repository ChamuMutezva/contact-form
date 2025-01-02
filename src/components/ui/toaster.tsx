"use client";

import { useToast } from "@/hooks/use-toast";
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast";
import Image from "next/image";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({
                id,
                title,
                description,
                action,
                ...props
            }) {
                return (
                    <Toast
                        key={id}
                        {...props}
                        className="bg-[hsl(var(--grey-900))] text-[hsl(var(--white))]"
                    >
                        <div className="grid gap-1 text-lg font-bold">
                            {title && (
                                <ToastTitle className="flex justify-start items-center gap-2">
                                    <Image
                                        height={21}
                                        width={20}
                                        src="/assets/images/icon-success-check.svg"
                                        alt=""
                                    />
                                    {title}
                                </ToastTitle>
                            )}
                            {description && (
                                <ToastDescription className="text-base font-normal text-[hsl(var(--green-200))]">
                                    {description}
                                </ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose className="text-[hsl(var(--white))]"/>
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
