import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReadCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [cc_date, setDate] = useState<string>("");
  const [cc_video, setVideo] = useState<string>("");
  const [cc_title, setTitle] = useState<string>("");
  const [cc_description, setDescription] = useState<string>("");

  const sendForm = (e: any) => {
    e.preventDefault();
    const formData = {
      cc_course_id: `${id}`,
      cc_title,
      cc_description,
      cc_video,
      cc_date,
    };


    fetch("https://shohsulton.uz/api/sections/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          alert("Success");
          navigate("/pages/course");
        }
      });
  };

  return (
    <section className="py-3 px-3">
      <div className="d-flex justify-content-between py-4">
        <button
          type="button"
          className="btn btn-warning"
          style={{ paddingTop: "12.5px" }}
          onClick={() => navigate("/pages/course")}
        >
          <i className="fas fa-arrow-left-long fs-5"></i>
        </button>
      </div>

      <form onSubmit={sendForm}>
        <label htmlFor="cc_title" className="w-100 mb-2">
          Заголовок
          <input
            required
            type="text"
            id="cc_title"
            value={cc_title}
            placeholder="Заголовок"
            className="form-control w-100"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="cc_description" className="w-100 py-2 mb-2">
          Описание
          <input
            required
            type="text"
            id="cc_description"
            value={cc_description}
            placeholder="Описание"
            className="form-control w-100"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label htmlFor="cc_video" className="w-100 py-2 mb-2">
          Видео
          <input
            required
            type="text"
            id="cc_video"
            value={cc_video}
            placeholder="Видео"
            className="form-control w-100"
            onChange={(e) => setVideo(e.target.value)}
          />
        </label>
        <label htmlFor="cc_date" className="w-100 py-2 mb-2">
          Дата
          <input
            required
            type="date"
            id="cc_date"
            value={cc_date}
            className="form-control"
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <button type="submit" className="btn btn-warning w-100">
          Отправить данные
        </button>
      </form>
    </section>
  );
};

export default ReadCourse;
