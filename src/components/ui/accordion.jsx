"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import React from "react";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@/components/icons/plus-icon";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("py-2", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header asChild className="flex w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between bg-white transition-all duration-1000 [&[data-state=open]>div>svg>path:nth-child(1)]:rotate-90 [&[data-state=open]>div>svg]:rotate-90",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between font-medium">
        {children}
        <PlusIcon className="size-4 shrink-0 fill-black text-black transition-transform duration-200" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("rounded-md bg-gray-50 p-2", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };