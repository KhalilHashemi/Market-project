import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/user";
import { useParams } from "react-router-dom";
import { sp } from "../../utils/numbers";
import Loader from "../modules/Loader";
import styles from "./Details.module.css";

function Details() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts-list"],
    queryFn: getAllPosts,
  });
  const { id } = useParams();

  const myPro = data?.data.posts.find((p) => p._id === id);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.details}>
          <div className={styles.content}>
            <h3>{myPro.options.title}</h3>
            <div>
              {myPro.options.city} | تاریخ آگهی :{" "}
              <span>
                {new Date(myPro.createdAt).toLocaleDateString("fa-IR")}
              </span>
            </div>
            <span>توضیحات :</span>
            <div>{myPro.options.content}</div>
            <p>قیمت : {sp(myPro.amount)}</p>
            <button>اطلاعات تماس</button>
          </div>
          <div className={styles.image}>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${myPro.images[0]}`}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
