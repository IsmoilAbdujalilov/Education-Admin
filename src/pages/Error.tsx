import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/pages/login");
    }
  }, []);

  return <h1>Error page</h1>;
};

export default Error;
