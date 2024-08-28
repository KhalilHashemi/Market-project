import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Loader from "../modules/Loader";
import { deleteCategory, getCategory } from "../../services/admin";
import styles from "./CategoryList.module.css";

function CategoryList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data?.data.map((category) => (
          <div key={category._id} className="flex mt-5 p-5 items-center">
            <img src={`${category.icon}.svg`} />
            <h5 className="mr-5 ">{category.name}</h5>
            <p className="text-left w-7/12">Slug : {category.slug}</p>
            <span className="w-3/12 text-left">
              <button
                onClick={() => mutate(category._id)}
                className="p-2 rounded"
              >
                پاک کردن دسته بندی
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
