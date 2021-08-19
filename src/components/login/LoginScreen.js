import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const LoginScreen = ({ history }) => {
  const { dispatch } = useContext(AuthContext);
  const handleLogin = () => {
    //History contains the previous paths used in the browser
    //with replace we are not allowing to return to the login screen once you Log-in
    const lastPath = localStorage.getItem("lastPath") || "/";
    history.replace(lastPath);
    dispatch({ type: types.login, payload: { name: "Isaac" } });
  };
  return (
    <div className="container mt-5">
      <h1>LoginScreen</h1>
      <hr />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
