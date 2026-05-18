import { authContext } from "@/Context/AuthContext";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  const navigate = useNavigate();

  const { serverUrl } = useContext(authContext);

  const userEmail = JSON.parse(localStorage.getItem("saveEmail"));

  const email = userEmail?.email;

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/otpVerify/${email}`,
        {
          otp: finalOtp,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-5">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white text-center">
          Verify OTP
        </h1>

        <p className="text-gray-400 text-center mt-3 leading-7">
          Enter the 6 digit OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-14 w-14 rounded-xl bg-black border border-gray-700 text-white text-center text-2xl outline-none focus:border-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-8 rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-500"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
