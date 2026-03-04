import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest active:scale-[0.98] active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-primary text-background hover:bg-primary/90 shadow-[0_10px_30px_-10px_rgba(var(--primary),0.3)] hover:shadow-[0_15px_40px_-10px_rgba(var(--primary),0.5)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 text-foreground backdrop-blur-md",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-white/5",
        link: "text-primary underline-offset-8 hover:underline decoration-primary/40",
      },
      size: {
        default: "h-12 px-8",
        xs: "h-8 px-3 text-[10px]",
        sm: "h-10 px-6",
        lg: "h-14 px-10 text-base",
        xl: "h-20 px-12 text-lg font-black",
        icon: "size-12 rounded-2xl",
        "icon-sm": "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
