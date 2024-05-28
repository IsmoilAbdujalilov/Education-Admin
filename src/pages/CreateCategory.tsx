import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [category_name, setCategoryName] = useState<string>("");
  const [category_image, setCategoryImage] = useState<File | null>(null);
  const [category_description, setCategoryDescription] = useState<string>("");
  const [category_isactive, setCategoryIsActive] = useState<boolean>(false);


  const sendFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("category_name", category_name);
    formData.append("category_description", category_description);
    if (category_image) {
      formData.append("category_image", category_image);
    }
    formData.append("category_isactive", JSON.stringify(category_isactive));

    fetch("https://shohsulton.uz/api/categories/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode !== 201 || data.statusCode !== 200) {
          alert(data.message);
        }

        if (data.statusCode === 200) {
          navigate("/pages/category");
        }
      });
  };

  return (
    <section className="px-3 py-3">
      <div className="d-flex justify-content-between py-4 mt-3">
        <button
          type="button"
          className="btn btn-warning"
          style={{ paddingTop: "12.5px" }}
          onClick={() => navigate("/pages/category")}
        >
          <i className="fas fa-arrow-left-long fs-5"></i>
        </button>
      </div>

      <form className="w-auto my-auto" onSubmit={sendFormData}>
        <label htmlFor="category_name" className="w-100 mb-3">
          Название категории
          <input
            required
            type="text"
            id="category_name"
            name="category_name"
            value={category_name}
            placeholder="Название категории"
            className="form-control rounded mt-2"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </label>
        <label htmlFor="category_description" className="w-100 mb-3">
          Категория Описание
          <input
            required
            type="text"
            id="category_description"
            name="category_description"
            value={category_description}
            placeholder="Описание категории"
            className="form-control rounded mt-2"
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </label>

        <div className="form-check form-switch mb-3">
          <input
            id="switch"
            role="switch"
            type="checkbox"
            name="category_isactive"
            checked={category_isactive}
            className="form-check-input"
            onChange={(e) => setCategoryIsActive(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="switch">
            Проверенный ввод флажка переключателя
          </label>
        </div>

        <label className="form-label mb-3" htmlFor="customFile">
          Пример ввода файла по умолчанию
          <input
            type="file"
            id="customFile"
            className="form-control"
            onChange={(e) =>
              setCategoryImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </label>

        <button type="submit" className="btn btn-warning w-100">
          Отправить в данные
        </button>
      </form>
    </section>
  );
};

export default CreateCategory;
