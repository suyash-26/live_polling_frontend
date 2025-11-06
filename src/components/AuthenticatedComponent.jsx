import React, { useContext } from "react";
import { AuthContext } from "../auth/contextProvider/AuthProvider";

export default function AuthenticatedComponent({ children, fallback }) {
  const { state } = useContext(AuthContext);
  return (
    <>
      {state.isAuthenticated
        ? children
        : fallback
        ? fallback
        : <UnAuthenticatedComponent/>}
    </>
  );
}

export const UnAuthenticatedComponent = () => {
  return (
    <>
      <div className="bg-[#101827] flex justify-center items-center text-white w-full ">
        Please authenticate to access this route
      </div>
    </>
  );
};
