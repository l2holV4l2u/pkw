import { useState } from "react";

interface ScoreCardProps {
  scores: {
    TGAT: Record<string, number>;
    TPAT: Record<string, number>;
    ALevel: Record<string, { score: number; name: string }>;
  };
}

const ScoreCard = ({ scores }: ScoreCardProps) => {
  const [activeTab, setActiveTab] = useState("TGAT");

  interface ButtonProps {
    name: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }

  const Button = ({ name, activeTab, setActiveTab }: ButtonProps) => {
    return (
      <button
        onClick={() => setActiveTab(name)} // Set activeTab to the clicked button's name
        className={`flex-1 py-2 text-center text-sm font-medium rounded-t-lg hover:bg-gray-100 ${
          activeTab === name
            ? " text-gray-800 font-semibold border-b-2 border-gray-800"
            : " text-gray-600"
        }`}
      >
        {name}
      </button>
    );
  };

  const renderScores = () => {
    if (activeTab === "TGAT") {
      return (
        <div className="p-6 rounded-lg shadow-md">
          <div className="space-y-2">
            {Object.entries(scores.TGAT).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-gray-600">TGAT {key}</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (activeTab === "TPAT") {
      return (
        <div className="p-6 rounded-lg shadow-md space-y-2">
          {Object.entries(scores.TPAT).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-gray-600">TPAT {key}</span>
              <span className="text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === "A-Level") {
      return (
        <div className="p-6 rounded-lg shadow-md space-y-2">
          {Object.entries(scores.ALevel).map(([key, { score, name }]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-gray-600">{name}</span>
              <span className="text-gray-800">{score}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm">
      <div className="flex justify-around border-b-2 border-gray-200">
        <Button name="TGAT" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Button name="TPAT" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Button
          name="A-Level"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      {renderScores()}
    </div>
  );
};

export default ScoreCard;
