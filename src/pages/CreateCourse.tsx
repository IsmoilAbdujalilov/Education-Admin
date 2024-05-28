import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const CreateCourse = () => {
  const peopleRef = useRef<HTMLInputElement | null>(null);
  const learnRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [course_name, setCourseName] = useState<string>("");
  const [course_price, setCoursePrice] = useState<string>("");
  const [course_video, setCourseVideo] = useState<string>("");
  const [courseLearn, setCourseLearn] = useState<string>("");
  const [course_isactive, setCourseChecked] = useState<boolean>(false);
  const [course_people_count, setCoursePeopleCount] = useState(["Ismoil"]);
  const [course_learns, setCourseLearns] = useState(["ReactJs"]);
  const [course_people_value, setPeopleValue] = useState("");
  const [course_category, setCourseCategory] = useState<any>("");
  const [course_description, setDescription] = useState<string>("");
  const [categoryData, setCategoryData] = useState<[]>([]);
  const [course_duration, setCourseDuration] = useState<string>("");

  const addUser = (e: any) => {
    e.preventDefault();

    if (course_people_count.length > 0) {
      setCoursePeopleCount([...course_people_count, course_people_value]);
      setPeopleValue("");

    } else {
      peopleRef.current?.focus();
    }
  };

  const addLearn = (e: any) => {
    e.preventDefault();

    if (courseLearn.length > 0) {
      setCourseLearns([...course_learns, courseLearn]);

      setCourseLearn("");
    } else {
      learnRef.current?.focus();
    }
  };

  useEffect(() => {
    fetch("https://shohsulton.uz/api/categories/all")
      .then((res) => res.json())
      .then((data) => setCategoryData(data.data));
  }, []);

  const getCategoryId = (val: string) => {
    const categoryId: any = categoryData.find(
      (el: any) => el.category_name === val
    );
    setCourseCategory(categoryId._id);
  };

  const sendForm = (e: any) => {
    e.preventDefault();

    const formData = {
      course_name,
      course_description,
      course_category,
      course_people_count,
      course_price,
      course_learns,
      course_duration,
      course_video,
      course_isactive,
    };

    fetch("https://shohsulton.uz/api/cources/create", {
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
          alert(data.message);
          navigate("/pages/course");
        } else {
          alert(data.message.join());
        }
      })
      
  };

  return (
    <section className="px-3 py-3">
      <div className="d-flex justify-content-between py-4 mt-3">
        <button
          type="button"
          className="btn btn-warning"
          style={{ paddingTop: "12.5px" }}
          onClick={() => navigate("/pages/course")}
        >
          <i className="fas fa-arrow-left-long fs-5"></i>
        </button>
      </div>

      <form className="w-auto my-auto" onSubmit={sendForm}>
        <label htmlFor="course_category" className="w-100 mb-3">
          Категория
          <select
            className="select w-100 py-2"
            onChange={(e) => getCategoryId(e.target.value)}
          >
            {categoryData.length > 0 &&
              categoryData.map((el: any) => {
                return (
                  <option id={el._id} value={el.category_name}>
                    {el.category_name}
                  </option>
                );
              })}
          </select>
        </label>
        <label htmlFor="course" className="w-100 mb-3">
          Название курса
          <input
            required
            type="text"
            id="course"
            name="course_name"
            value={course_name}
            placeholder="Название курса"
            className="form-control rounded mt-2"
            onChange={(e) => setCourseName(e.target.value)}
          />
        </label>
        <label htmlFor="description" className="w-100 mb-3">
          Описание
          <input
            required
            type="text"
            id="description"
            name="description"
            placeholder="Описание"
            value={course_description}
            className="form-control rounded mt-2"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label htmlFor="price" className="w-100 mb-3">
          Цена
          <input
            required
            id="price"
            type="number"
            name="course_price"
            placeholder="Цена"
            value={course_price}
            className="form-control rounded mt-2"
            onChange={(e) => setCoursePrice(e.target.value)}
          />
        </label>
        <label htmlFor="duration" className="w-100 mb-3">
          Продолжительность
          <input
            required
            type="text"
            id="duration"
            name="course_duration"
            value={course_duration}
            placeholder="Продолжительность"
            className="form-control rounded mt-2"
            onChange={(e) => setCourseDuration(e.target.value)}
          />
        </label>
        <label htmlFor="video" className="w-100 mb-3">
          Видео
          <input
            required
            id="video"
            type="text"
            name="course_video"
            placeholder="Видео"
            value={course_video}
            className="form-control rounded mt-2"
            onChange={(e) => setCourseVideo(e.target.value)}
          />
        </label>
        <label htmlFor="course_people_count" className="w-100 mb-3">
          Оценка пользователей
          <input
            type="text"
            ref={peopleRef}
            id="course_people_count"
            name="course_people_count"
            value={course_people_value}
            placeholder="Оценка пользователей"
            className="form-control rounded mb-3"
            onChange={(e) => setPeopleValue(e.target.value)}
          />
          <button
            type="submit"
            onClick={addUser}
            className="btn btn-warning w-100 mb-3"
          >
            Добавить пользователей
          </button>
          <table className="table border align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>Счет</th>
                <th>Пользователь</th>
                <th>Редактировать</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {course_people_count.length > 0 &&
                course_people_count.map((el: any, index: number) => {
                  return (
                    <tr key={el.id}>
                      <td>
                        <p
                          className="fw-normal mb-1"
                          style={{
                            maxWidth: "400px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {index + 1}
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
                          {el}
                        </p>
                      </td>
                      <td>
                        <button
                          type="button"
                          data-mdb-ripple-color="dark"
                          //   onClick={() => editUser(el.id)}
                          className="btn btn-link btn-rounded btn-sm fw-bold"
                        >
                          <i className="fas fa-pen fs-5"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          data-mdb-ripple-color="dark"
                          //   onClick={() => deleteUser(el.id)}
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
        </label>
        <label htmlFor="course_learn" className="w-100 mb-3">
          Курс обучения
          <input
            type="text"
            ref={learnRef}
            id="course_learn"
            name="course_learn"
            value={courseLearn}
            placeholder="Курс обучения"
            className="form-control rounded mb-3"
            onChange={(e) => setCourseLearn(e.target.value)}
          />
          <button
            type="submit"
            onClick={addLearn}
            className="btn btn-warning w-100 mb-3"
          >
            Добавить обучение
          </button>
          <table className="table border align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>Счет</th>
                <th>Учиться</th>
                <th>Редактировать</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {course_learns.length > 0 &&
                course_learns.map((el: any, index: number) => {
                  return (
                    <tr key={el.id}>
                      <td>
                        <p
                          className="fw-normal mb-1"
                          style={{
                            maxWidth: "400px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {index + 1}
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
                          {el}
                        </p>
                      </td>
                      <td>
                        <button
                          type="button"
                          data-mdb-ripple-color="dark"
                          className="btn btn-link btn-rounded btn-sm fw-bold"
                        >
                          <i className="fas fa-pen fs-5"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          data-mdb-ripple-color="dark"
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
        </label>
        <label htmlFor="flexSwitchCheckDefault" className="w-100 mb-3">
          <div className="form-check form-switch">
            <input
              role="switch"
              type="checkbox"
              checked={course_isactive}
              id="flexSwitchCheckDefault"
              className="form-check-input"
              onChange={(e) => setCourseChecked(e.target.checked)}
            />
          </div>
        </label>

        <button className="btn btn-warning w-100" type="submit">
          Добавить данные формы
        </button>
      </form>
    </section>
  );
};

export default CreateCourse;
