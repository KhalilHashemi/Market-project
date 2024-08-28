import { sendOtp } from "../../services/auth";
import styles from "./SendOtpForm.module.css"

function SendOtpForm({ mobile, setMobile, setStep }) {
  const submitHandler = async (event) => {
    event.preventDefault();

    if (mobile.length !== 11) return alert("شماره وارد شده نادرست است");
    const { response, error } = await sendOtp(mobile);
    if (response) setStep(2);
    if (error) console.log(error.response.data.message);
  };
  return (
    <form
      onSubmit={submitHandler}
      className={`max-w-lg m-auto flex flex-col mt-52 p-8 ${styles.form}`}
    >
      <p className="text-lg font-normal mb-5">ورود به حساب کاربری</p>
      <span className="text-gray-500 text-sm mb-5 p-2">
        برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید. کد
        تایید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight outline-none"
        id="input"
        placeholder="مثلا : 09123456789"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button
        className="border-none text-white cursor-pointer hover:bg-red-900 font-bold py-2 px-2 rounded"
        type="submit"
      >
        ارسال کد تایید
      </button>
    </form>
  );
}

export default SendOtpForm;
