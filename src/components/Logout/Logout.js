import React, { useEffect } from "react";
import { useAuth } from "context/auth";

function Logout() {
  const { setAuthTokens, authTokens } = useAuth();
  const logout = async () => {
    setAuthTokens();
    localStorage.removeItem("currentUser");

    localStorage.removeItem("currentToken");
  };

  return <span onClick={logout}>Log out</span>;
}
export default Logout;
