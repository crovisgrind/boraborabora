// components/ui/select.tsx

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-(--surface-2) bg-(--surface-1) px-3 py-2 text-sm text-(--text-primary) placeholder:text-(--text-secondary) focus:outline-none focus:ring-2 focus:ring-(--accent) disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-(--surface-2) bg-(--surface-1) px-3 py-2 text-sm text-(--text-primary) cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--accent)",
      className
    )}
    {...props}
  />
));
SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps {
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => (
  <span className="text-(--text-secondary)">{placeholder || "Select..."}</span>
);

interface SelectContentProps {
  children?: React.ReactNode;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => (
  <div className="absolute mt-1 w-full rounded-md border border-(--surface-2) bg-(--surface-1) shadow-md z-50">
    {children}
  </div>
);

interface SelectItemProps {
  value: string;
  children?: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => (
  <option value={value}>{children}</option>
);