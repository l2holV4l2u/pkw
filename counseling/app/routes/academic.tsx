import Layout from "./components/layout";
import LollipopChart from "./components/lollipopcard";
import ScoreCard from "./components/scorecard";
import SearchBar from "./components/searchbar";
import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

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

const initialUniversityScores = [
  {
    university: "Chulalongkorn",
    program: "Engineering",
    minScore: 85,
    maxScore: 100,
    userScore: 90,
  },
  {
    university: "Mahidol",
    program: "Medicine",
    minScore: 70,
    maxScore: 86,
    userScore: 90,
  },
  {
    university: "Kasetsart",
    program: "Agriculture",
    minScore: 64,
    maxScore: 85,
    userScore: 70,
  },
];

export default function Academic() {
  const [universityScores, setUniversityScores] = useState(
    initialUniversityScores
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If the drag ends over the search bar, process the dropped data
    if (over?.id === "lollipop") {
      const draggedData = active.data.current as {
        university: string;
        program: string;
        minScore: number;
        maxScore: number;
        userScore: number;
      }; // Ensure the type matches the state structure

      if (draggedData) {
        // Update LollipopCard with the new data
        setUniversityScores((prevScores) => [...prevScores, draggedData]);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Layout title="Academic" className="grid grid-cols-10 gap-6">
        <div className="col-span-7 row-span-1" id="score">
          <ScoreCard scores={score} />
        </div>
        <div className="col-span-3 row-span-5" id="search">
          <SearchBar />
        </div>
        <div className="col-span-7 row-span-1" id="lollipop">
          <LollipopChart universityScores={universityScores} />
        </div>
      </Layout>
    </DndContext>
  );
}
