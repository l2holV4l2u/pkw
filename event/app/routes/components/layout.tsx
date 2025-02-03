import Breadcrumb from "./breadcrumb";

export default function Layout({
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
      className={`p-6 space-y-6 h-full bg-white rounded-3xl border-2 border-border`}
    >
      {title && (
        <div className="mb-3 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800">{title}</h1>
        </div>
      )}
      {link && label && <Breadcrumb link={link} label={label} />}
      <div className={`${className}`}>{children}</div>
    </div>
  );
}
