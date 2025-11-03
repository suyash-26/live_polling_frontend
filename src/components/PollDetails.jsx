import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import api from "../network/interceptors";

export default function PollDetails() {
  const navigate = useNavigate();
  const { pollId } = useParams();
  const [pollDetails, setPollDetails] = useState(null);
   const [socket, setSocket] = useState(null);
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);
    
    if (pollId) {
      newSocket.emit('join-poll', pollId);
    }

    return () => {
      newSocket.disconnect();
    };
  }, [pollId]);

  const fetchPollDetails = async () => {
     try {
      const res = await api.get(`${API_URL}/polls/${pollId}`);
      setPollDetails(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, [pollId]);

  const refreshPollDetails = () => {
    fetchPollDetails();
  }

  return (
      <div className="bg-[#101827] text-white w-full px-4 md:px-6 flex flex-col">
        <div className="poll-details-header flex justify-between py-2 md:py-5 items-center">
          <p className="text-lg font-bold md:text-3xl">{pollDetails?.title || "-"}</p>
          <div className="flex gap-1 md:gap-2">
            <button className="py-1 md:py-3 px-2 md:px-6 text-xs md:text-lg rounded hover:bg-[#29303D]">
              Reset Votes
            </button>
            <button className="py-2 md:py-2 px-2 md:px-6 rounded text-xs md:text-lg bg-[#F43F5E] hover:bg-[#29303D]">
              Delete Poll
            </button>
          </div>
        </div>
        <div className="inline-tabs">
          <div className="flex gap-3 md:gap-7 mt-2 md:mt-4">
            <p
              onClick={() => {
                navigate(`/poll/${pollId}/live`);
              }}
              className="text-xs md:text-lg text-underline border-b-3 md:border-b-5 rounded border-b-red-300 px-1 md:px-2 pt-1 md:pt-2 md:pb-1 hover:bg-gray-500"
            >
              Live
            </p>
            <p
              onClick={() => {
                navigate(`/poll/${pollId}/questions`);
              }}
              className="text-xs md:text-lg text-underline border-b-3 md:border-b-5 rounded border-b-red-300 px-1 md:px-2 pt-1 md:pt-2 md:pb-1 hover:bg-gray-500"
            >
              Questions
            </p>
            <p
              onClick={() => {
                navigate(`/poll/${pollId}/results`);
              }}
              className="text-xs md:text-lg text-underline border-b-3 md:border-b-5 rounded border-b-red-300 px-1 md:px-2 pt-1 md:pt-2 md:pb-1 hover:bg-gray-500"
            >
              Results
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <Outlet context={{pollDetails, refreshPollDetails, socket}} />
        </div>
      </div>
  );
}
