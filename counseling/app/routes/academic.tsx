import AdmissionComparison from "./components/admission";
import Card from "./components/card";
import Layout from "./components/layout";

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
    university: "Chulalongkorn University",
    program: "Engineering",
    minScore: 85,
    maxScore: 100,
  },
  {
    university: "Mahidol University",
    program: "Medicine",
    minScore: 90,
    maxScore: 105,
  },
  {
    university: "Kasetsart University",
    program: "Agriculture",
    minScore: 70,
    maxScore: 85,
  },
];

export default function Academic() {
  return (
    <Layout title="Academic">
      <Card title="Academic Scores">
        <div className="space-y-6">
          {/* TGAT Scores */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
              TGAT
            </h3>
            <div className="space-y-2">
              {Object.entries(score.TGAT).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600">TGAT {key}</span>
                  <span className="font-semibold text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TPAT Scores */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
              TPAT
            </h3>
            <div className="space-y-2">
              {Object.entries(score.TPAT).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600">TPAT {key}</span>
                  <span className="font-semibold text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* A-Level Scores */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
              A-Level
            </h3>
            <div className="space-y-2">
              {Object.entries(score.ALevel).map(([key, { score, name }]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600">{name}</span>
                  <span className="font-semibold text-gray-800">{score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* University Comparison Card */}
      <Card title="University Score Comparison">
        <div className="space-y-6">
          {universityScores.map(
            ({ university, program, minScore, maxScore }) => (
              <div
                key={university + program}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  {university}
                </h3>
                <p className="text-gray-600 mb-4">Program: {program}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Minimum Score</span>
                  <span className="font-semibold text-gray-800">
                    {minScore}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Maximum Score</span>
                  <span className="font-semibold text-gray-800">
                    {maxScore}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </Card>

      <AdmissionComparison />
    </Layout>
  );
}
