"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn, nameToSlug } from "@/lib/utils"

export function FaqSectionClient({ className, defaultOpenSections, children }) {
  const defaultValues = Array.isArray(defaultOpenSections)
    ? defaultOpenSections
    : defaultOpenSections
      ? [defaultOpenSections]
      : ["product-details"]

  return (
    <Accordion type="multiple" className={cn("w-full", className)} defaultValue={defaultValues}>
      {children}
    </Accordion>
  )
}


export function FaqAccordionItem({ title, children }) {
  return (
    <AccordionItem value={nameToSlug(title)} key={nameToSlug(title)}>
      <AccordionTrigger className="py-4 text-base font-bold">{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  )
}
