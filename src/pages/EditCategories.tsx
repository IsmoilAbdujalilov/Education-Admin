import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [categoryIsActive, setCategoryIsActive] = useState<any>(false);

  useEffect(() => {
    fetch(`https://shohsulton.uz/api/categories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setCategoryName(data.data.category_name);
          setCategoryDescription(data.data.category_description);
          setCategoryIsActive(data.data.category_isactive);
          // You may want to handle the category image differently if it's a URL.
          // setCategoryImage(data.data.category_image);
        }
      });
  }, [id]);

  const sendFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("category_id", id!); // Non-null assertion since id is expected to be defined.
    if (categoryImage) {
      formData.append("category_image", categoryImage);
    }
    formData.append("category_description", categoryDescription);
    formData.append("category_name", categoryName);

    formData.append("category_isactive", categoryIsActive);

    fetch("https://shohsulton.uz/api/categories", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          navigate("/pages/category");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <section className="px-3 pt-5">
      <div className="d-flex justify-content-start py-4">
        <button
          type="button"
          className="btn btn-warning"
          style={{ paddingTop: "12.5px" }}
          onClick={() => navigate("/pages/category")}
        >
          <i className="fas fa-arrow-left-long fs-5"></i>
        </button>
      </div>

      <form className="w-auto my-auto py-3" onSubmit={sendFormData}>
        <label htmlFor="category_name" className="w-100 mb-3">
          Название категории
          <input
            required
            type="text"
            id="category_name"
            name="category_name"
            value={categoryName}
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
            value={categoryDescription}
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
            checked={categoryIsActive}
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
              setCategoryImage(
                e.target.files?.length ? e.target.files[0] : null
              )
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
