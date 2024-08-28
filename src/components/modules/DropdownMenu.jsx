import { Link, Navigate, useNavigate } from "react-router-dom";
import { Dropdown } from "rsuite";

import styles from "./DropdownMenu.module.css";
import { deleteCookie, getCookie } from "../../utils/cookie";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/user";

const DropdownMenu = ({ trigger, title }) => {
  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const navigate = useNavigate();
  const exitAcountHandler = () => {
    deleteCookie(["accessToken", "refreshToken"]);
    navigate("/auth");
    refetch();
  };

  return (
    <Dropdown
      title={title}
      trigger={trigger}
      className={`${styles.dropdown} hover:cursor-pointer rounded relative mr-2 text-gray-500`}
    >
      <Link to={data ? "/dashboard" : "/auth"}>
        <Dropdown.Item>ورود | ثبت نام</Dropdown.Item>
      </Link>
      <Link onClick={exitAcountHandler}>
        <Dropdown.Item>خروج</Dropdown.Item>
      </Link>
    </Dropdown>
  );
};

export default DropdownMenu;
