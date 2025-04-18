import { FaLocationDot, FaRegCalendar } from "react-icons/fa6";
import { Link } from "@remix-run/react";
import { Card } from "./card";

export function EventCard({ event }: { event: any }) {
  const { img, name, description, location, date, id } = event;
  return (
    <Link to={`./${id}`}>
      <Card className="text-sm h-full" clickable={true}>
        <img src={img} className="w-full h-48 rounded-xl rounded-b-none" />
        <div className="flex flex-col p-2 gap-2">
          <h1 className="w-full text-lg font-semibold text-left">{name}</h1>
          <div>{description}</div>
          <div className="flex items-center gap-2">
            <FaRegCalendar size={16} />
            {date}
          </div>
          <div className="flex items-center gap-2">
            <FaLocationDot />
            {location}
          </div>
        </div>
      </Card>
    </Link>
  );
}
