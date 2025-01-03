import Layout from "./components/layout";
import LollipopChart from "./components/lollipopchart";
import ScoreCard from "./components/scorecard";
import Card from "./components/card";

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

const universityScores = [
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
  return (
    <Layout title="Academic">
      <ScoreCard scores={score} />
      <Card>
        <LollipopChart universityScores={universityScores} />
      </Card>
    </Layout>
  );
}
