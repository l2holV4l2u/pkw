import Layout from "./components/layout";
import LollipopChart from "./components/lollipopcard";
import ScoreCard from "./components/scorecard";
import Card from "./components/card";
import SearchBar from "./components/searchbar";
import { useState } from "react";

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
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async (query: string) => {
    if (!query) return;
    // Simulated search functionality
    const programs = [
      "Computer Science",
      "Mechanical Engineering",
      "Business Administration",
    ];
    const filteredResults = programs.filter((program) =>
      program.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <Layout title="Academic" className="grid grid-cols-7 gap-6">
      <div className="col-span-5 row-span-1">
        <ScoreCard scores={score} />
      </div>
      <div className="col-span-2 row-span-2">
        <SearchBar />
      </div>
      <div className="col-span-5 row-span-1">
        <LollipopChart universityScores={universityScores} />
      </div>
    </Layout>
  );
}

/*
Uni data format ex.
{
  "_id": "6183b148ee214bbbe863301d",
  "university_id": "001",
  "university_type": "1",
  "university_name": "จุฬาลงกรณ์มหาวิทยาลัย",
  "university_name_en": "Chulalongkorn University",
  "is_accepted_round1": false,
  "is_accepted_round2": false,
  "is_accepted_round3": false,
  "is_accepted_round4": false,
  "file_path_1": "https://s3.ap-southeast-1.amazonaws.com/my-tcas/001/pdf/1729494598153/TCAS68_R1_Q.pdf",
  "file_path_2": "https://s3.ap-southeast-1.amazonaws.com/my-tcas/001/pdf/1730433154769/TCAS68_R2_Q.pdf",
  "file_path_3": "https://s3.ap-southeast-1.amazonaws.com/my-tcas/001/pdf/1730102454283/TCAS67_R3_Q.pdf"
},

Course data format ex.
{
  "_id": "6715fb30deea14086a61f76f",
  "university_type_id": "1",
  "university_type_name_th": "ทปอ.",
  "university_id": "001",
  "university_name_th": "จุฬาลงกรณ์มหาวิทยาลัย",
  "university_name_en": "Chulalongkorn University",
  "campus_id": "01",
  "campus_name_th": "วิทยาเขตหลัก",
  "campus_name_en": "Main Campus",
  "faculty_id": "21",
  "faculty_name_th": "คณะวิศวกรรมศาสตร์",
  "faculty_name_en": "Faculty of Engineering",
  "group_field_id": "30",
  "group_field_th": "วิศวกรรมศาสตร์",
  "field_id": "00",
  "field_name_th": "วิศวกรรมทั่วไป",
  "field_name_en": "General Engineering",
  "program_running_number": "01",
  "program_name_th": "หลักสูตรวิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมศาสตร์",
  "program_name_en": "Bachelor of Engineering Program",
  "program_type_id": "A",
  "program_type_name_th": "ภาษาไทย ปกติ",
  "program_id": "10010121300001A",
  "number_acceptance_mko2": 0,
  "program_partners_id": "0",
  "program_partners_inter_name": "0",
  "country_partners_name": "0",
  "major_acceptance_number": 0,
  "cost": "ภาคการศึกษาต้นและภาคการศึกษาปลาย ภาคการศึกษาละ 25,500 บาท ภาคฤดูร้อน(ถ้ามี) ภาคการศึกษาละ 6,375 บาท ดูรายละเอียดเพิ่มเติม https://www.reg.chula.ac.th/th/information/fee/",
  "graduate_rate": "ร้อยละ 86.8 ต่อปีการศึกษา",
  "employment_rate": "",
  "median_salary": "",
  "created_at": "2024-10-21T06:56:48.514Z",
  "updated_at": "2024-10-21T06:57:58.753Z"
},
*/
