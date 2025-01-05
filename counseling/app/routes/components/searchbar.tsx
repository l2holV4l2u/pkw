import { useState, useEffect } from "react";
import Card from "./card";
import Input from "./input";
import UniCard from "./unicard";
import SearchIcon from "../utils/icon/search";
import courseDataJSON from "../utils/course.json";
import { DndContext, DragOverlay } from "@dnd-kit/core";

// Define the structure of the course.json file
interface Course {
  _id: string;
  university_name_en: string;
  university_name_th: string;
  program_name_en: string;
  program_name_th: string;
  cost: string;
  graduate_rate: string;
  employment_rate: string;
  median_salary: string;
}

interface CourseData {
  course: Course[];
}

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Course[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Explicitly type the JSON import
  const courseData: Course[] = (courseDataJSON as CourseData).course;

  const handleSearch = () => {
    const filteredResults = courseData.filter(
      (course) =>
        course.university_name_en.toLowerCase().includes(query.toLowerCase()) ||
        course.program_name_en.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <DndContext
      onDragStart={(event) => {
        // Cast to string to resolve the type mismatch error
        setActiveId(event.active.id as string);
        setIsDragging(true);
      }}
      onDragEnd={() => {
        setIsDragging(false);
        setActiveId(null);
      }}
    >
      <Card className="space-y-4 h-full p-4">
        <Input
          field={query}
          setField={setQuery}
          label=""
          type="text"
          placeholder="search for university"
          icon={<SearchIcon width={20} height={20} />}
        />
        <Card className="flex flex-wrap h-fit">
          {results.length > 0 ? (
            results
              .slice(0, 5) // Limit results to at most 5
              .map((course, index) => (
                <UniCard key={course._id} unidata={course} index={index} />
              ))
          ) : (
            <p className="text-gray-500 text-center">No results found</p>
          )}
        </Card>
      </Card>

      <DragOverlay>
        {isDragging && activeId ? (
          <div className="rounded-xl pointer-events-none border-2 border-gray-200">
            <UniCard
              unidata={results.find((course) => course._id === activeId)!}
              index={0}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
