/** @format */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
// import useAuth from "../Hook/useAuth";

const PrivateRout = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace></Navigate>
  );
};

export default PrivateRout;
