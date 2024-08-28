import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/admin";
import { useState } from "react";
import styles from "./AddPost.module.css";
import { getCookie } from "../../utils/cookie";
import axios from "axios";
import toast from "react-hot-toast";
function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: null,
    city: "",
    category: "",
    images: null,
  });

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const addHandler = (event) => {
    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }
    const token = getCookie("accessToken");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))
      .then(
        setForm({
          title: "",
          content: "",
          amount: "",
          city: "",
          category: "",
          images: null,
        })
      )
      .catch((error) => console.log(error));
    event.preventDefault();
  };

  return (
    <form onChange={changeHandler} className={`mt-10 ${styles.form}`}>
      <h3 className="mb-8 w-fit pb-1">افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      {/* <input type="text" id="title" name="title" value={form.title} /> */}
      <label htmlFor="content">توضیحات</label>
      {/* <textarea name="content" id="content" value={form.content} /> */}
      <label htmlFor="amount">قیمت</label>
      {/* <input type="number" id="amount" name="amount" value={form.amount} /> */}
      <label htmlFor="city">شهر</label>
      {/* <input type="text" id="city" name="city" value={form.city} /> */}
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {data?.data.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">عکس</label>
      {/* <input type="file" id="images" name="images" value={form.images} /> */}
      <button onClick={addHandler} className="border-none cursor-pointer">
        ایجاد
      </button>
    </form>
  );
}

export default AddPost;
