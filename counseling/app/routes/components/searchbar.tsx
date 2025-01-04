import { useState } from "react";
import Card from "./card";
import Input from "./input";
import Button from "./button";
import UniCard from "./unicard";

// Define the type for university data
interface University {
  _id: string;
  university_name: string;
  university_name_en: string;
  is_accepted_round1: boolean;
  is_accepted_round2: boolean;
  is_accepted_round3: boolean;
  is_accepted_round4: boolean;
}

// Example static data for universities (replace with API integration if needed)
const universityData: University[] = [
  {
    _id: "6183b148ee214bbbe863301d",
    university_name: "จุฬาลงกรณ์มหาวิทยาลัย",
    university_name_en: "Chulalongkorn University",
    is_accepted_round1: false,
    is_accepted_round2: false,
    is_accepted_round3: false,
    is_accepted_round4: false,
  },
  {
    _id: "6715fb30deea14086a61f76f",
    university_name: "มหาวิทยาลัยธรรมศาสตร์",
    university_name_en: "Thammasat University",
    is_accepted_round1: true,
    is_accepted_round2: true,
    is_accepted_round3: false,
    is_accepted_round4: true,
  },
];

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<University[]>([]);

  const handleSearch = () => {
    const filteredResults = universityData.filter(
      (uni) =>
        uni.university_name_en.toLowerCase().includes(query.toLowerCase()) ||
        uni.university_name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <Card className="space-y-6">
      {/* Search Input */}
      <div className="flex items-center gap-2 w-full">
        <Input field={query} setField={setQuery} label="" type="text" />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <Card className="h-fit">
        {/* Search Results */}
        <div className="flex flex-wrap gap-4">
          {results.length > 0 ? (
            results.map((uni) => <UniCard unidata={uni} />)
          ) : (
            <p className="text-gray-500 text-center w-full">
              No results found. Try another search query.
            </p>
          )}
        </div>
      </Card>
    </Card>
  );
}
