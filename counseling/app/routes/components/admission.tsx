import Card from "./card";

// Example data
const applicantData = {
  course: "Computer Science",
  lowestScore: 450,
  highestScore: 700,
  medianScore: 550,
  userScore: 580,
  percentile: 75, // Example: User's score is better than 75% of applicants
};

export default function AdmissionComparison() {
  const {
    course,
    lowestScore,
    highestScore,
    medianScore,
    userScore,
    percentile,
  } = applicantData;

  const qualified = userScore >= lowestScore;

  return (
    <Card title={`Admission Comparison for ${course}`}>
      <div className="space-y-6">
        {/* Qualification Status */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center">
            Admission Status
          </h3>
          <div className="text-gray-800">
            {qualified ? (
              <p>
                <span className="font-semibold text-green-700">
                  Congratulations!
                </span>{" "}
                Your score qualifies for admission as it is higher than the
                lowest score required.
              </p>
            ) : (
              <p>
                <span className="font-semibold text-red-700">
                  Unfortunately,
                </span>{" "}
                your score is below the required threshold for admission.
              </p>
            )}
          </div>
        </div>

        {/* Percentile Rank */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center">
            Your Percentile Rank
          </h3>
          <div className="flex items-center space-x-4">
            <div className="relative w-full">
              <div className="h-4 bg-blue-200 rounded-full">
                <div
                  className="h-4 bg-blue-600 rounded-full"
                  style={{ width: `${percentile}%` }}
                />
              </div>
            </div>
            <span className="text-gray-800 font-semibold">{percentile}%</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Your score is higher than {percentile}% of applicants for this
            course.
          </p>
        </div>
      </div>
    </Card>
  );
}
