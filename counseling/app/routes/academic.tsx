// academic.tsx
import Layout from "./components/layout";
import ScoreCard from "./components/scorecard";
import SearchBar from "./components/searchbar";
import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import LollipopCard from "./components/lollipopcard";

// Define score categories
const score = {
  TGAT: {
    1: 10,
    2: 15,
    3: 20,
  },
  TPAT: {
    1: 15,
    2: 20,
    3: 25,
    4: 30,
    5: 35,
  },
  ALevel: {
    61: { score: 20, name: "คณิตศาสตร์ประยุกต์ 1" },
    62: { score: 30, name: "คณิตศาสตร์ประยุกต์ 2" },
    63: { score: 35, name: "วิทยาศาสตร์ประยุกต์" },
    64: { score: 40, name: "ฟิสิกส์" },
    65: { score: 45, name: "เคมี" },
    66: { score: 50, name: "ชีววิทยา" },
    70: { score: 55, name: "สังคมศาสตร์" },
    81: { score: 60, name: "ภาษาไทย" },
    82: { score: 65, name: "ภาษาอังกฤษ" },
    83: { score: 70, name: "ภาษาฝรั่งเศส" },
    84: { score: 75, name: "ภาษาเยอรมัน" },
    85: { score: 80, name: "ภาษาญี่ปุ่น" },
    86: { score: 85, name: "ภาษาเกาหลี" },
    87: { score: 90, name: "ภาษาจีน" },
    88: { score: 95, name: "ภาษาบาลี" },
    89: { score: 100, name: "ภาษาสเปน" },
  },
};

const initialScores = [
  {
    university: "Chulalongkorn",
    program: "Bachelor of Engineering",
    minScore: 75,
    maxScore: 90,
    userScore: 80,
  },
  {
    university: "Mahidol",
    program: "Doctor of Medicine",
    minScore: 70,
    maxScore: 86,
    userScore: 90,
  },
  {
    university: "Kasetsart",
    program: "Bachelor of Arts",
    minScore: 64,
    maxScore: 85,
    userScore: 70,
  },
];

export default function Academic() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeID, setActiveId] = useState<string | null>(null);
  const [scores, setScores] = useState(initialScores);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id === "lollipop") {
      const draggedData = active.data.current as {
        university_name_en: string;
        program_name_en: string;
        cost: string;
        graduate_rate: string;
        employment_rate: string;
        median_salary: string;
      };

      if (draggedData) {
        setScores((prevScores) => [
          ...prevScores,
          {
            university: draggedData.university_name_en.split(" ")[0],
            program: draggedData.program_name_en,
            minScore: 10,
            maxScore: 50,
            userScore: 80,
          },
        ]);
      }
    }
  };

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
        setIsDragging(true);
      }}
      onDragEnd={(event) => {
        setIsDragging(false);
        setActiveId(null);
        handleDragEnd(event);
      }}
    >
      <Layout title="Academic" className="grid grid-cols-10 gap-6">
        <div className="col-span-7 row-span-1" id="score">
          <ScoreCard scores={score} />
        </div>
        <div className="col-span-3 row-span-5" id="search">
          <SearchBar isDragging={isDragging} activeID={activeID} />
        </div>
        <div className="col-span-7 row-span-1" id="lollipop">
          <LollipopCard scores={scores} />
        </div>
      </Layout>
    </DndContext>
  );
}
