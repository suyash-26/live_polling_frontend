import React, { useContext, useState } from "react";
import axios from "axios";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Charts from "./Charts"; // For preview
import { AuthContext } from "../auth/contextProvider/AuthProvider";
import Sidebar from "./Sidebar";
import { useEffect } from "react";

const AdminDashboard = () => {
  // const [poll, setPoll] = useState({
  //   title: "",
  //   questions: [{ q: "", options: ["", ""], type: "bar" }],
  // });
  // const [polls, setPolls] = useState([]);
  // const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  // const navigate = useNavigate();
  // const API_URL = import.meta.env.VITE_API_URL;

  // const { state, dispatch } = useContext(AuthContext);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(`${API_URL}/polls`, poll, {
  //       headers: { Authorization: `Bearer ${userToken}` },
  //     });
  //     navigate(`/present/${res.data.pollId}`);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const addQuestion = () =>
  //   setPoll({
  //     ...poll,
  //     questions: [...poll.questions, { q: "", options: ["", ""], type: "bar" }],
  //   });

  // const fetchPolls = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/polls`, {
  //       headers: { Authorization: `Bearer ${userToken}` },
  //     });
  //     setPolls(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   if (userToken) fetchPolls();
  // }, [userToken]);

  // Simple login (expand with full auth form)
  // const login = async (email, password) => {
  //   navigate(`/login`);
  // };

  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default AdminDashboard;
