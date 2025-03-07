export default function EventCard({ event }: { event: any }) {
  const { img, name, description, location, date } = event;
  return (
    <div className="rounded-xl border-2 border-border shadow-sm space-y-2 relative ">
      <img src={img} className="w-full h-12" />
      <h1 className="w-full text-left">{name}</h1>
    </div>
  );
}
