import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/contextProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Modal from "./modal/Modal";
import { useCallback } from "react";
import api from "../network/interceptors";

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(true);
  const { state, dispatch, logout } = useContext(AuthContext);
  const [pollModal, setPollModal] = useState(false);
  const [pollTitle, setPollTitle] = useState("");
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();

  const createPoll = async () => {
    if (!pollTitle) {
      console.log("Poll title is required");
      return;
    }
    try {
      const poll = await api.post("polls/create", { title: pollTitle });
      console.log("poll created successfully");
      setPollModal(false);
    } catch (err) {
      console.log("err", err);
    }
  };
  const getPollsList = async ()=>{
    try{
      const res = await api.get("/polls/getUserPolls");
      console.log("res",res)
      setPolls(res.data);
    }catch(err){
      console.log(err);
      return;
    }
  }

  useEffect(()=>{
    getPollsList();
  },[])

  const handleModalClose = useCallback(() => setPollModal(false),[]);

  return (
    <div className="h-screen flex">
      {open && (
        <div className=" bg-[#1D2432] text-white px-2 md:px-5 md:pt-4 h-screen fixed md:static w-[200px] md:w-[320px]">
          <div className="header flex justify-between">
            <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-xl md:text-2xl">
              LIVE POLL
            </h1>
            <div className="flex gap-[8px]">
              {state?.isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="cursor-pointer text-xs md:text-base"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
              <button
                className="cursor-pointer text-xs md:text-base md:hidden"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
          <div className="mt-4 md:mt-9">
            <button
              onClick={() => {
                if (!state.isAuthenticated) {
                  navigate("/login");
                  return;
                }
                setPollModal(true);
              }}
              className="bg-[#FF4081] p-1 md:p-3 rounded-[10px] mt-1 md:mt-2 text-white cursor-pointer w-full"
            >
              + New Poll
            </button>
          </div>
          <h1 className="mt-5 md:mt-8 text-lg">My Polls</h1>
          {polls && polls.length > 0 ? (
            polls.map((poll, index) => {
              return (
                <div
                  className="mt-2"
                  onClick={() => {
                    navigate(`/poll/${poll._id}`);
                  }}
                >
                  <h1 className=" mb-2 p-1 md:p-2 rounded-[10px] bg-gradient-to-r from-blue-500 to-purple-600 text-white text-transparent">
                    {poll.title}
                  </h1>
                </div>
              );
            })
          ) : (
            <p className="text-lg text-gray-300 md:mt-2">
              Create your first poll
            </p>
          )}
          <Modal
            isOpen={pollModal}
            title={"Create Poll"}
            onClose={handleModalClose}
          >
            <div>
              <div className="p-10 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent flex flex-col gap-2 ">
                <label for="poll_title">Poll Title</label>
                <input
                  className="text-white border-2 p-3 rounded"
                  name="poll_title"
                  value={pollTitle}
                  onChange={(e) => {
                    setPollTitle(e.target?.value || "");
                  }}
                  placeholder="Enter poll title"
                />
              </div>
              <button
                className="border-2 roounded p-2 cursor-pointer"
                onClick={() => {
                  createPoll();
                }}
              >
                Create
              </button>
            </div>
          </Modal>
        </div>
      )}
      {!open && (
        <p
          onClick={() => setOpen(true)}
          className="fixed text-white top-[10px] left-[10px]"
        >
          Open
        </p>
      )}
      {children}
    </div>
  );
}
