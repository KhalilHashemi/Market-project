import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import { ButtonToolbar } from "rsuite";
import DropdownMenu from "../components/modules/DropdownMenu";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

function Header() {
  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return (
    <header
      className={`${styles.header} flex justify-between items-center py-5 mb-2`}
    >
      <div className="flex items-center">
        <Link to="/">
          <img src="divar.svg" alt="Divar" className="ml-10 w-10" />
        </Link>
        <span className="flex align-items-center text-gray">
          <img src="location.svg" alt="Location" />
          <p className="mr-1 text-gray-500">تهران</p>
        </span>
      </div>
      <div className="flex items-center">
        {data?.data?.role === "ADMIN" ? (
          <Link to="/admin">پنل ادمین</Link>
        ) : null}
        <ButtonToolbar>
          <span className="flex ml-20 items-center">
            <DropdownMenu
              trigger="hover"
              title={
                <>
                  <img src="profile.svg" />{" "}
                  <span className="mx-1">دیوار من</span>
                </>
              }
            />
          </span>
        </ButtonToolbar>
        <div className={styles.addPost}>
          <Link to="/dashboard" className=" w-25 text-center mr-8 p-2 rounded">
            ثبت آگهی
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
