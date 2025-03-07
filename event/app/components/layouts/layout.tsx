import { Breadcrumb } from "@/components/ui";
import React from "react";

export function Layout({
  children,
  title,
  className,
  link,
  label,
  button,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  link?: string[];
  label?: string[];
  button?: React.ReactNode;
}) {
  return (
    <div
      className={`p-6 flex flex-col space-y-4 h-full bg-gradient-to-br from-white to-slate-50 rounded-3xl border-2 border-border ${className}`}
    >
      {title && (
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-text-800">{title}</h1>
          {button}
        </div>
      )}
      {link && label && <Breadcrumb link={link} label={label} />}
      {children}
    </div>
  );
}
