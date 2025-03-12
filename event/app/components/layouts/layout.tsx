import { Breadcrumb } from "@/components/ui";
import React from "react";

export function Layout({
  children,
  title,
  className,
  link,
  label,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  link?: string[];
  label?: string[];
}) {
  return (
    <div
      className={`p-6 flex flex-col space-y-4 h-full bg-gradient-to-br from-white to-slate-50 rounded-3xl border-2 border-border ${className}`}
    >
      {title && (
        <h1 className="text-2xl font-extrabold text-text-800">{title}</h1>
      )}
      {link && label && <Breadcrumb link={link} label={label} />}
      {children}
    </div>
  );
}
