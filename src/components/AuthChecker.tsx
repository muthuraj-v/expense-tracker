import React, { useEffect } from "react";

const AuthChecker: React.FC = () => {
  useEffect(() => {
    const cookies = document.cookie;
    const hasJWT = cookies
      .split(";")
      .some((cookie) => cookie.trim().startsWith("jwt="));

    if (hasJWT) {
      localStorage.setItem("auth", "true");
    } else {
      localStorage.setItem("auth", "false");
    }
  }, []);

  return null;
};

export default AuthChecker;
