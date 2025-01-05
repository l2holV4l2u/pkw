import { useState, useEffect } from "react";
import Card from "./card";
import Input from "./input";
import UniCard from "./unicard";
import SearchIcon from "../utils/icon/search";
import courseDataJSON from "../utils/course.json";

// Define the structure of the course.json file
interface Course {
  _id: string;
  university_type_id: string;
  university_type_name_th: string;
  university_id: string;
  university_name_th: string;
  university_name_en: string;
  campus_id: string;
  campus_name_th: string;
  campus_name_en: string;
  faculty_id: string;
  faculty_name_th: string;
  faculty_name_en: string;
  group_field_id: string;
  group_field_th: string;
  field_id: string;
  field_name_th: string;
  field_name_en: string;
  program_running_number: string;
  program_name_th: string;
  program_name_en: string;
  program_type_id: string;
  program_type_name_th: string;
  program_id: string;
  number_acceptance_mko2: number;
  program_partners_id: string;
  program_partners_inter_name: string;
  country_partners_name: string;
  major_id: string;
  major_name_th: string;
  major_name_en: string;
  major_acceptance_number: number;
  cost: string;
  graduate_rate: string;
  employment_rate: string;
  median_salary: string;
  created_at: string;
}

interface CourseData {
  course: Course[];
}

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Course[]>([]);

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
    <Card className="space-y-4 h-full">
      <Input
        field={query}
        setField={setQuery}
        label=""
        type="text"
        placeholder="search for university"
        icon={<SearchIcon width={20} height={20} />}
      />
      <Card className="flex flex-wrap h-fit p-0">
        {results.length > 0 ? (
          results
            .slice(0, 5) // Limit results to at most 10
            .map((course, index) => (
              <UniCard unidata={course} key={course._id} index={index} />
            ))
        ) : (
          <p className="text-gray-500 text-center">No results found</p>
        )}
      </Card>
    </Card>
  );
}
