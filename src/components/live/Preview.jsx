import React, { useState } from "react";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Timer from "./Timer";
import { calculateElapsedTime } from "../../utils";

export default function Preview() {
  const [currentQuestionDetails, setCurrentQuestionDetails] = useState({});
  const { socket, pollDetails, refreshPollDetails } = useOutletContext();
  const { pollId } = useParams();
  useEffect(() => {
    if (!socket) return;

    socket.on("question-pushed", async (data) => {
      refreshPollDetails();
    });
    return () => {
      socket.off("question-pushed");
    };
  }, [socket, pollDetails]);

  useEffect(() => {
    const activeQuestion = pollDetails?.questions?.find(
      (q) => q.isActive === true
    );
    setCurrentQuestionDetails(activeQuestion || null);
  }, [pollDetails]);
  console.log("jlk",calculateElapsedTime(currentQuestionDetails?.lastActivatedAt))
  return (
    <div className="pt-7">
      <h1 className="text-sm md:text-xl">Live Preview</h1>
      {currentQuestionDetails ? (
        <div className="flex flex-col justify-center gap-3 items-center text-sm md:text-lg mt-3 mb-5 p-2 md:p-4 rounded">
          <h1 className="text-xl">{currentQuestionDetails?.title}</h1>
          <Timer startTime={currentQuestionDetails?.activeTime - calculateElapsedTime(currentQuestionDetails?.lastActivatedAt).seconds}/>
          {currentQuestionDetails?.options?.map((option, index) => (
            <div
              key={index}
              className="bg-[#1D2432] text-white my-2 p-3 rounded w-1/2 mx-auto"
            >
              {option.val}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-sm md:text-lg bg-[#1D2432] mt-3 mb-5 p-2 md:p-4 rounded">
          Lobby Screen
        </div>
      )}
    </div>
  );
}
