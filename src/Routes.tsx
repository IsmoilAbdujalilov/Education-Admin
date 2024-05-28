import { useEffect } from "react";
import { Header } from "./components";
import { Outlet, useNavigate } from "react-router-dom";

const Routes = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/pages/login");
    }
  }, []);
  return (
    <>
      <Header />
      <main style={{ marginTop: "58px" }}>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default Routes;
