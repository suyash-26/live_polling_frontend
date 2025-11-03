import React, { createContext, useReducer } from "react";
import authReducer, { initialState } from "../Reducers/auth";
import api from "../../network/interceptors";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const signup = async (userData) => {
    dispatch({ type: "SIGNUP_REQUEST" });
    try {
      const response = await api.post("/auth/signup", userData);
      const data = response.data;
      dispatch({ type: "SIGNUP_SUCCESS", payload: data });
      return response;
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "SIGNUP_FAILURE",
        payload: error?.response?.data?.msg || error.message,
      });
    }
  };

  const login = async (userData) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      console.log("ehllo")
      const response = await api.post("/auth/login", userData);
      const data = response.data;
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      navigate("/")
    } catch (error) {
      console.log("error",error?.response?.data?.msg)
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error?.response?.data?.msg || error.message,
      });
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE", payload: error.message });
    }
  };

  const checkAuth = async () => {
    dispatch({ type: "AUTH_REQUEST" });
    try {
      await api.get("/auth/protected").then((response) => {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: {
            user: response?.data?.user,
            message: `Welcome, ${response?.data?.user}`,
          },
        });
      });
    } catch (err) {
      console.log("err", err);
      dispatch({
        type: "AUTH_FAILURE",
        payload: err.response?.data?.message || "Not authenticated",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, signup, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
