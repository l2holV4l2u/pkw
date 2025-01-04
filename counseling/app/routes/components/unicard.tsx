import Card from "./card";

interface University {
  _id: string;
  university_name: string;
  university_name_en: string;
  university_logo?: string;
  is_accepted_round1: boolean;
  is_accepted_round2: boolean;
  is_accepted_round3: boolean;
  is_accepted_round4: boolean;
}

export default function UniCard({ unidata }: { unidata: University }) {
  return (
    <div className="flex">
      <img
        src={unidata.university_logo || "/fallback-logo.png"} // Fallback if logo is missing
        alt={`${unidata.university_name_en} Logo`}
        className="w-8 h-8 object-contain"
      />
      <div className="text-sm">
        <h3 className="text-gray-800 font-bold">
          {unidata.university_name_en}
        </h3>
        <p className="text-gray-600">{unidata.university_name}</p>
      </div>
    </div>
  );
}
