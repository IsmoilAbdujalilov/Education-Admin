import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch("https://shohsulton.uz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          localStorage.setItem("role", data.role);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      });
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label htmlFor="user_email">Электронная почта</label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  onChange={handleChange}
                  value={formData.user_email}
                  placeholder="Адрес электронной почты"
                  className="form-control form-control-lg border"
                />
              </div>

              <div className="form-outline mb-4">
                <label htmlFor="user_password">Пароль</label>
                <input
                  type="password"
                  id="user_password"
                  name="user_password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.user_password}
                  className="form-control form-control-lg border"
                />
              </div>

              <p className="text-end">
                <Link className="mb-3" to="/pages/registration">
                  Постановка на учет
                </Link>
              </p>

              <button
                type="submit"
                className="btn btn-warning btn-lg btn-block"
              >
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
