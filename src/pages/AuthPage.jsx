import { useState } from "react";
import SendOtpForm from "../components/templates/SendOtpForm";
import CheckOtpForm from "../components/templates/CheckOtpForm";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");

  return (
    <div>
      {step === 1 && (
        <SendOtpForm mobile={mobile} setMobile={setMobile} setStep={setStep} />
      )}
      {step === 2 && (
        <CheckOtpForm mobile={mobile} code={code}  setCode={setCode} setStep={setStep} />
      )}
    </div>
  );
}

export default AuthPage;
