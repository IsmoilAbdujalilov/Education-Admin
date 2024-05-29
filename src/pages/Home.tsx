import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState<any>([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState<any>([]);
  const [wallets, setWallets] = useState([]);

  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "user") {
      navigate("/pages/category");
    } else {
      navigate("/");
    }

    fetch("https://shohsulton.uz/api/statistc/all/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data?.data?.users));

    fetch("https://shohsulton.uz/api/statistc/all/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data?.data?.users));

    fetch("https://shohsulton.uz/api/statistc/all/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data?.data?.categories));

    fetch("https://shohsulton.uz/api/statistc/all/orderpayments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPayments(data?.data?.orderpayments));

    fetch("https://shohsulton.uz/api/statistc/all/wallets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setWallets(data?.data?.orderpayments));
  }, []);

  return (
    <section className="py-3 px-3">
      <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            role="tab"
            id="ex1-tab-1"
            href="#ex1-tabs-1"
            aria-controls="ex1-tabs-1"
            aria-selected={activeTab === "tab1"}
            className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => handleTabClick("tab1")}
          >
            Пользователи
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
            id="ex1-tab-2"
            href="#ex1-tabs-2"
            role="tab"
            aria-controls="ex1-tabs-2"
            aria-selected={activeTab === "tab2"}
            onClick={() => handleTabClick("tab2")}
          >
            Курсы
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
            id="ex1-tab-3"
            href="#ex1-tabs-3"
            role="tab"
            aria-controls="ex1-tabs-3"
            aria-selected={activeTab === "tab3"}
            onClick={() => handleTabClick("tab3")}
          >
            Категории
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === "tab4" ? "active" : ""}`}
            id="ex1-tab-4"
            href="#ex1-tabs-4"
            role="tab"
            aria-controls="ex1-tabs-4"
            aria-selected={activeTab === "tab4"}
            onClick={() => handleTabClick("tab4")}
          >
            Оплата
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === "tab5" ? "active" : ""}`}
            id="ex1-tab-5"
            href="#ex1-tabs-5"
            role="tab"
            aria-controls="ex1-tabs-5"
            aria-selected={activeTab === "tab5"}
            onClick={() => handleTabClick("tab5")}
          >
            Кошельки
          </a>
        </li>
      </ul>

      <div className="tab-content" id="ex1-content">
        <div
          className={`tab-pane fade ${
            activeTab === "tab1" ? "show active" : ""
          }`}
          id="ex1-tabs-1"
          role="tabpanel"
          aria-labelledby="ex1-tab-1"
        >
          <div className="table-responsive">
            <table className="table border align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Изображение</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Электронная почта</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((el: any) => (
                    <tr key={el._id}>
                      <td>
                        <img
                          alt="avatar"
                          className="rounded-circle"
                          src={"https://picsum.photos/500/500"}
                          style={{ width: "45px", height: "45px" }}
                        />
                      </td>
                      <td>
                        <p
                          className="fw-normal mb-1"
                          style={{
                            maxWidth: "400px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {el.user_firstname}
                        </p>
                      </td>
                      <td className="text-center">
                        <p
                          className="fw-normal mb-1"
                          style={{
                            maxWidth: "400px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {el.user_lastname}
                        </p>
                      </td>
                      <td>
                        <p
                          className="fw-normal mb-1"
                          style={{
                            maxWidth: "400px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {el.user_email}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "tab2" ? "show active" : ""
          }`}
          id="ex1-tabs-2"
          role="tabpanel"
          aria-labelledby="ex1-tab-2"
        >
          <div className="table-responsive">
            <table className="table border align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Имя</th>
                  <th>Описание</th>
                  <th>Продолжительность</th>
                  <th>Цена</th>
                  <th>Выключатель</th>
                </tr>
              </thead>
              <tbody>
                {courses?.length > 0 &&
                  courses?.map((el: any) => {
                    return (
                      <tr key={el._id}>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el?.course_name}
                          </p>
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el?.course_description}
                          </p>
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el?.course_duration}
                          </p>
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el?.course_price}
                          </p>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              role="switch"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                              className="form-check-input"
                              checked={el?.course_isactive}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "tab3" ? "show active" : ""
          }`}
          id="ex1-tabs-3"
          role="tabpanel"
          aria-labelledby="ex1-tab-3"
        >
          <div className="table-responsive">
            <table className="table border align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Изображение</th>
                  <th>Имя</th>
                  <th>Описание</th>
                  <th>Продолжительность</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 &&
                  categories.map((el: any) => {
                    return (
                      <tr key={el._id}>
                        <td>
                          <img
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "45px", height: "45px" }}
                            src={`https://shohsulton.uz/api/images/${el.category_image}`}
                          />
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el.category_name}
                          </p>
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el.category_description}
                          </p>
                        </td>

                        <td className="d-flex justify-content-center">
                          <div className="form-check form-switch">
                            <input
                              role="switch"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                              className="form-check-input"
                              checked={el.category_isactive}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "tab4" ? "show active" : ""
          }`}
          id="ex1-tabs-4"
          role="tabpanel"
          aria-labelledby="ex1-tab-4"
        >
          <div className="table-responsive">
            <table className="table border align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Изображение</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Электронная почта</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 &&
                  payments.map((el: any) => {
                    return (
                      <tr key={el._id}>
                        <td>
                          <img
                            alt="avatar"
                            className="rounded-circle"
                            src={"https://picsum.photos/500/500"}
                            style={{ width: "45px", height: "45px" }}
                          />
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el?.orderp_user_id?.user_firstname}
                          </p>
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el.orderp_user_id?.user_lastname}
                          </p>
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el.orderp_user_id?.user_email}
                          </p>
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el.orderp_price_amount}$
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "tab5" ? "show active" : ""
          }`}
          id="ex1-tabs-5"
          role="tabpanel"
          aria-labelledby="ex1-tab-5"
        >
          <div className="table-responsive">
            <table className="table border align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Изображение</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Электронная почта</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {wallets.length > 0 &&
                  wallets.map((el: any) => {
                    return (
                      <tr key={el._id}>
                        <td>
                          <img
                            alt="avatar"
                            className="rounded-circle"
                            src={"https://picsum.photos/500/500"}
                            style={{ width: "45px", height: "45px" }}
                          />
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el?.orderp_user_id?.user_firstname}
                          </p>
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el.orderp_user_id?.user_lastname}
                          </p>
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el.orderp_user_id?.user_email}
                          </p>
                        </td>
                        <td>
                          <p
                            className="fw-normal mb-1"
                            style={{
                              maxWidth: "400px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el.orderp_price_amount}$
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
