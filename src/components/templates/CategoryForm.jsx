import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addCategory } from "../../services/admin";
import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const queryClient = useQueryClient();

  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.icon || !form.slug) return;
    mutate(form);
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      {!!error && <p>مشکلی پیش آمده است !</p>}
      {data?.status === 201 && <p>دسته بندی با موفقیت اضافه شد</p>}
      <h3 className="mb-5 pb-2 w-fit">دسته بندی جدید</h3>
      <label htmlFor="name">نام دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکون</label>
      <input type="text" name="icon" id="icon" />
      <div>
        <button type="submit" disabled={isLoading} className="rounded">
          ایجاد
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
