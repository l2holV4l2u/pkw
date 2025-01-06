import { useDraggable } from "@dnd-kit/core";

interface Course {
  _id: string;
  university_name_en: string;
  university_name_th: string;
  university_id: string;
  program_name_en: string;
  program_name_th: string;
  cost: string;
  graduate_rate: string;
  employment_rate: string;
  median_salary: string;
}

export default function UniCard({
  unidata,
  index,
}: {
  unidata: Course;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: unidata._id,
    data: unidata,
  });

  return (
    <div
      className={`flex flex-col items-start p-4 rounded-xl w-full ${
        index % 2 === 0 ? "bg-white" : "bg-gray-100"
      } 
      `}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <img
        src={"/logo/" + unidata.university_id + ".png"}
        className="w-12 h-12 object-cover"
      />
      <h3 className="text-gray-800 text-sm font-bold">
        {unidata.university_name_en}
      </h3>
      <p className="text-gray-600 text-sm">{unidata.program_name_en}</p>
    </div>
  );
}
