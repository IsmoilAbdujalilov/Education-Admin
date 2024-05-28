import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetch("https://shohsulton.uz/api/categories/all", {
      headers: {
        Authorizasition: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategoryData(data.data));
  }, []);

  const deleteItem = (id: string) => {
    fetch(`https://shohsulton.uz/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode) {
          fetch("https://shohsulton.uz/api/categories/all", {
            headers: {
              Authorizasition: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => setCategoryData(data.data));
        }
      });
  };

  return (
    <div className="pt-4 pe-3 ps-3">
      <div className="d-flex justify-content-between py-4">
        <h2>Категории</h2>
        <button
          type="button"
          className="btn btn-warning"
          style={{ paddingTop: "12.5px" }}
          onClick={() => navigate("/pages/category/create")}
        >
          <i className="fas fa-folder-plus fs-5"></i>
        </button>
      </div>
      <div className="table-responsive">
        <table className="table border align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Имя</th>
              <th>Читать</th>
              <th>Выключатель</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.map((el: any) => (
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
                <td>
                  <button
                    type="button"
                    data-mdb-ripple-color="dark"
                    className="btn btn-link btn-rounded btn-sm fw-bold"
                    onClick={() => navigate(`/pages/category/${el._id}`)}
                  >
                    <i className="fas fa-pen fs-5"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    data-mdb-ripple-color="dark"
                    onClick={() => deleteItem(el._id)}
                    className="btn btn-link btn-rounded btn-sm fw-bold"
                  >
                    <i className="fas fa-trash fs-5"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
