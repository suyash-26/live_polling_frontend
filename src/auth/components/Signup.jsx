import axios from "axios";
import React, { useContext, useState } from "react";
import api from "../../network/interceptors";
import { AuthContext } from "../contextProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, state } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ email, password });
      navigate("/")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#101827] h-lvh flex justify-center items-center">
      <div>
        <form
          className="flex flex-col  w-[440px] gap-[16px] bg-[#1D2432] p-12 pb-14 rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-white text-center text-xl fw-[1000]">Signup</h1>
          <input
            className="bg-[#282F3C]  p-3 text-white rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-[#282F3C] p-3 text-white rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={state.loading}
            className="bg-[#FF4081] p-3 rounded mt-2 text-white cursor-pointer"
            type="submit"
          >
            {state.loading ? "Loading..." : "Singup"}
          </button>
          {state.error && <p className="text-white">{state.error}</p>}
          <p className="text-white text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#FF4081] cursor-pointer"
            >
              Login
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
