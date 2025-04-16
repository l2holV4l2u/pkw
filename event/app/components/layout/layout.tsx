import { Breadcrumb } from "@components/customui/breadcrumb";
import { Card } from "@components/customui/card";
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
    <Card
      className={`p-4 space-y-4 w-full h-full bg-gradient-to-br from-white to-slate-50 ${className}`}
    >
      {title && (
        <h1 className="text-2xl font-extrabold text-text-800">{title}</h1>
      )}
      {link && label && <Breadcrumb link={link} label={label} />}
      {children}
    </Card>
  );
}
