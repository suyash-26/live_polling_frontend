import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import PresenterView from "./components/PresenterView";
import PollParticipant from "./components/PollParticipant";
import "./App.css";
import Login from "./auth/components/Login";
import Signup from "./auth/components/Signup";
import Welcome from "./components/Welcome";
import PollDetails from "./components/PollDetails";
import Live from "./components/live/Live";
import Results from "./components/results/Results";
import Questions from "./components/questions/Questions";
import api from "./network/interceptors";
import { AuthContext } from "./auth/contextProvider/AuthProvider";
import VoteDashboard from "./components/VoteDashboard";

function App() {
  const { checkAuth } = useContext(AuthContext);
  useEffect(() => {
    checkAuth();
  }, []);
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminDashboard />}>
            <Route index element={<Welcome />} />
          </Route>
          <Route path="/poll" element={<AdminDashboard />}>
            <Route index element={<Welcome />} />
            <Route path=":pollId" element={<PollDetails />}>
              <Route index element={<Live />} />
              <Route path="live" element={<Live />} />
              <Route path="questions" element={<Questions />} />
              <Route path="results" element={<Results />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="bg-black text-white">Not Found</h1>}
            />
          </Route>
          <Route path="/vote/:pollId" element={<VoteDashboard/>} />
          <Route path="/present/:pollId" element={<PresenterView />} />
          <Route path="/join/:pollId" element={<PollParticipant />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </div>
  );
}

export default App;
