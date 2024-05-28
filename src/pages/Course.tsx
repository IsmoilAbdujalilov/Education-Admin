import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Course = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [coursesData, setCoursesData] = useState([]);

  const getCourseData = async () => {
    const request = await fetch("https://shohsulton.uz/api/cources/all");
    const res = await request.json();
    setCoursesData(res.data);
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const deleteCourseItem = (id: string | number) => {
    fetch(`https://shohsulton.uz/api/cources/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          alert(data.message);
          getCourseData();
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div className="pt-4 px-3">
      <div className="d-flex justify-content-between py-4">
        <h2>Курсы</h2>
        <button
          type="button"
          className="btn btn-warning"
          style={{ paddingTop: "12.5px" }}
          onClick={() => navigate("/pages/course/create")}
        >
          <i className="fas fa-folder-plus fs-5"></i>
        </button>
      </div>
      <div className="table-responsive">
        <table className="table border align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Видео</th>
              <th>Имя</th>
              <th>Цена</th>
              <th>Описание</th>
              <th>Продолжительность</th>
              <th>Учиться</th>
              <th>Читать</th>
              <th>Выключатель</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {coursesData.map((el: any) => {
              return (
                <tr key={el._id}>
                  <td className="text-center">
                    <iframe
                      width={300}
                      height={150}
                      src={`https://www.youtube.com/embed/${
                        el.course_video.split("v=")[1]
                      }`}
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
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
                      {el.course_name}
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
                      {el.course_price}
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
                      {el.course_description}
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
                      {el.course_duration}
                    </p>
                  </td>
                  <td className="text-center">
                    <select className="select w-100">
                      {el?.course_learns.map((el: string) => {
                        return <option value={el}>{el}</option>;
                      })}
                    </select>
                  </td>
                  <td className="text-center">
                    <div className="form-check form-switch">
                      <input
                        role="switch"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        className="form-check-input"
                        checked={el.course_isactive}
                      />
                    </div>
                  </td>
                  <td className="text-center">
                    <i
                      className="fas fa-eye fs-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/pages/course/read/${el._id}`)}
                    ></i>
                  </td>
                  <td>
                    <button
                      type="button"
                      data-mdb-ripple-color="dark"
                      className="btn btn-link btn-rounded btn-sm fw-bold"
                      onClick={() => navigate(`/pages/course/${el._id}`)}
                    >
                      <i className="fas fa-pen fs-5"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      data-mdb-ripple-color="dark"
                      onClick={() => deleteCourseItem(el._id)}
                      className="btn btn-link btn-rounded btn-sm fw-bold"
                    >
                      <i className="fas fa-trash fs-5"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Course;
