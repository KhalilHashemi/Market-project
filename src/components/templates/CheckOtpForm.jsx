import { useNavigate } from "react-router-dom";
import { checkOtp } from "../../services/auth";
import { setCookie } from "../../utils/cookie";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/user";

import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ mobile, code, setCode, setStep }) {
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile,
  });
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return alert("کد وارد شده نادرست است");

    const { response, error } = await checkOtp(mobile, code);
    console.log(response);

    if (response) {
      setCookie(response.data);
      navigate("/dashboard");
      refetch();
    }

    if (error) console.log(error.response.data.message);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="max-w-lg m-auto flex flex-col mt-52 p-8"
    >
      <p className="text-lg font-normal mb-5">تایید کد ارسال شده</p>
      <span className="text-gray-600 text-sm mb-5">
        کد 5 رقمی ارسال شده به شماره « {mobile} » را وارد نمایید
      </span>
      <label htmlFor="input">کد تایید :</label>
      <input
        className="mt-3  p-2"
        type="number"
        id="input"
        placeholder="مثلا : 12345"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="md:flex sm:block justify-between">
        <button
          type="submit"
          className="md:w-5/12 border-none text-white cursor-pointer hover:bg-red-900 font-bold py-2 px-2 rounded"
        >
          تایید
        </button>
        <button
          onClick={() => setStep(1)}
          className="md:w-5/12 border-none text-white cursor-pointer hover:bg-red-900 font-bold py-2 px-2 rounded"
        >
          تغییر شماره موبایل
        </button>
      </div>
    </form>
  );
}

export default CheckOtpForm;
