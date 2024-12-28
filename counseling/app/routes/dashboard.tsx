import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "./components/card";
import Navbar from "./components/navbar";
import placeholder from "./utils/placeholder.png";
import Collapsible from "./components/collapsible";

type UserData = {
  name: string;
  studentID: string;
  email: string;
  grade: number;
  gpa: number;
  scores: {
    tgat: {
      [key: number]: number;
    };
    tpat: {
      [key: number]: number;
    };
    alevel: {
      math1: number;
      math2: number;
      phys: number;
      chem: number;
      bio: number;
    };
  };
  universityList: string[];
};

export const loader: LoaderFunction = async () => {
  // Fetch or generate user data here
  const userData: UserData = {
    name: "Naruesorn Prabpon",
    studentID: "42493",
    email: "naruesornprabpon@gmail.com",
    grade: 12,
    gpa: 3.84,
    scores: {
      tgat: {
        1: 37.6,
        2: 42.3,
        3: 61.4,
      },
      tpat: {
        2: 45.6,
        3: 52.3,
        4: 48.5,
        5: 56.7,
      },
      alevel: {
        math1: 55.4,
        math2: 38.7,
        phys: 69.5,
        chem: 36.2,
        bio: 48.6,
      },
    },
    universityList: [
      "Chulalongkorn University",
      "Mahidol University",
      "Thammasat University",
      "Kasetsart University",
      "King Mongkut's University of Technology Thonburi",
    ],
  };

  return userData;
};

export default function Dashboard() {
  const data = useLoaderData<UserData>();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-700 mb-6">Dashboard</h1>

          {/* Personal Information Card */}
          <Card title="Personal Information">
            <div className="flex flex-row items-start justify-start space-x-4">
              <div className="w-40 h-40 rounded-md overflow-hidden shadow-md">
                <img src={placeholder} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Name: </span>
                  {data.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Email: </span>
                  {data.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Student ID: </span>
                  {data.studentID}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Grade: </span>
                  {data.grade}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">GPA: </span>
                  {data.gpa}
                </p>
              </div>
            </div>
          </Card>

          {/* Academic Scores Collapsible */}
          <Card title="Academic Scores">
            <div className="space-y-4">
              <Collapsible title="TGAT">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b-2 text-md text-left py-2 px-4 text-gray-600">
                        Subject
                      </th>
                      <th className="border-b-2 text-md text-right py-2 px-4 text-gray-600">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data.scores.tgat).map(([key, value]) => (
                      <tr key={key}>
                        <td className="border-b py-2 text-sm text-left px-4 text-gray-600">
                          TGAT {key}
                        </td>
                        <td className="border-b py-2 text-sm text-right px-4 text-gray-600">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Collapsible>

              <Collapsible title="TPAT">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b-2 py-2 text-md text-left px-4 text-gray-600">
                        Subject
                      </th>
                      <th className="border-b-2 py-2 text-md text-right px-4 text-gray-600">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data.scores.tpat).map(([key, value]) => (
                      <tr key={key}>
                        <td className="border-b py-2 text-sm text-left px-4 text-gray-600">
                          TPAT {key}
                        </td>
                        <td className="border-b py-2 text-sm text-right px-4 text-gray-600">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Collapsible>

              <Collapsible title="A-Level">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b-2 py-2 text-md text-left px-4 text-gray-600">
                        Subject
                      </th>
                      <th className="border-b-2 py-2 text-md text-right px-4 text-gray-600">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data.scores.alevel).map(
                      ([subject, value]) => (
                        <tr key={subject}>
                          <td className="border-b py-2 text-sm text-left px-4 text-gray-600">
                            {subject.toUpperCase()}
                          </td>
                          <td className="border-b py-2 text-sm text-right px-4 text-gray-600">
                            {value}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </Collapsible>
            </div>
          </Card>

          {/* University List Card */}
          <Card title="University List">
            <div className="flex flex-col gap-4">
              {data.universityList.map((university, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-sm font-semibold text-gray-700">
                    {index + 1}. {university}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
