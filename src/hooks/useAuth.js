import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/*
========================================================
FILE PURPOSE:
Custom hook to simplify accessing AuthContext.

WHY:
Prevents importing useContext + AuthContext everywhere.
Cleaner architecture.
========================================================
*/

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
