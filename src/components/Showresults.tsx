import { useEffect, useState } from "react";
import img from "../assets/loader.gif";


interface Result {
  confidence?: string;
  fluency?: number;
  grammar?: number;
  improvement?: string;
  suggestions?: string;
  vocabulary?: number;
  what_could_have_been_better?: string;
  feedback?:string
}

interface Props {
  result?: Result;
  loader?: boolean;
}

const Showresults: React.FC<Props> = ({ result, loader }) => {
  const [totalMarks, setTotalMarks] = useState<number>(0);

  useEffect(() => {
    if (result) {
      const { fluency = 0, grammar = 0, vocabulary = 0 } = result;
      setTotalMarks(fluency + grammar + vocabulary);
    }
  }, [result]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      {loader ? (
        <img src={img} alt="Loading..." className="h-32" />
      ) : (
        <div className="bg-[#f5e4cc] shadow-sm rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-orange-400 text-white text-center p-2 rounded-t-lg">
            <span className="text-xl font-bold">Total Score: {totalMarks}</span>
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Analysis:</h1>
            <div className="space-y-3">
              <h2 className="text-sm">
                <span className="font-bold">Confidence:</span> {result?.confidence}
              </h2>
              {result?.improvement && (
                <h2 className="text-sm">
                  <span className="font-bold">Improvements:</span> {result.improvement}
                </h2>
              )}
              {result?.suggestions && (
                <h2 className="text-sm">
                  <span className="font-bold">Suggestions:</span> {result.suggestions}
                </h2>
              )}
              {result?.what_could_have_been_better && (
                <>
                  <h2 className="text-sm font-bold">What could have been better:</h2>
                  <span>{result.what_could_have_been_better}</span>
                </>
              )}
              <h2 className="text-sm font-bold">Marks for this round:</h2>
              <h4 className="text-sm">Fluency: <span className="font-bold">{result?.fluency || 0}</span></h4>
              <h4 className="text-sm">Grammar: <span className="font-bold">{result?.grammar || 0}</span></h4>
              <h4 className="text-sm">Vocabulary: <span className="font-bold">{result?.vocabulary || 0}</span></h4>
              <div className="mt-6">
                {result?.feedback && (
                  <>
                    <h1 className="text-2xl font-semibold">Feedback</h1>
                    <h2 className="mt-2 text-sm text-gray-700">{result.feedback}</h2>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showresults;
