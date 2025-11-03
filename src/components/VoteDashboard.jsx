import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../network/interceptors";
import { useMemo } from "react";

export default function VoteDashboard() {
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
  const { pollId } = useParams();
  const [pollDetails, setPollDetails] = useState(null);
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  const fetchPollDetails = async () => {
    // Fetch active question from server if needed
    try {
      const res = await api.get(`/polls/${pollId}`);
      setPollDetails(res.data);
    } catch (err) {
      console.log("err", err);
      return;
    }
  };

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    newSocket.emit("join-poll", pollId);
    newSocket.on("question-pushed", ({ questionId }) => {
      console.log("Question pushed:", questionId);
      setActiveQuestionId(questionId);
    });
    return () => {
      newSocket.off("question-pushed");
      newSocket.disconnect();
    };
  }, [pollId]);

  useEffect(() => {
    fetchPollDetails();
  }, [pollId]);

  const activeQuestionDetails = useMemo(() => {
    return pollDetails?.questions?.find((q) => q._id === activeQuestionId);
  }, [activeQuestionId, pollDetails]);
  console.log("Active Question ID:", activeQuestionDetails);
  return (
    <div className="vote-dashboard bg-[#101827] text-white w-full px-4 md:px-6 flex flex-col h-screen">
      {activeQuestionId ? (
        <div className="vote-dashboard-container flex flex-col items-center justify-center h-full">
          <h2 className="question-title">{activeQuestionDetails?.title}</h2>
          {activeQuestionDetails?.options?.map((option, index) => (
            <button
              key={index}
              className="option-button bg-[#1D2432] hover:bg-[#282F3C] px-6 md:px-12 py-3 md:py-4 rounded mt-4 w-full md:w-1/2 text-center"
            >
              {" "}
              {option.val}
            </button>
          ))}
        </div>
      ) : (
        <div className="vote-dashboard-container flex flex-col items-center justify-center h-full">
          <h2 className="question-title">Waiting for the next question...</h2>
        </div>
      )}
    </div>
  );
}
