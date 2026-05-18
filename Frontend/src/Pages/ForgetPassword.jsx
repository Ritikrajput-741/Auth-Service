import { authContext } from "@/Context/AuthContext";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgetPassword = () => {
  const [userEmailValue, setUserEmailValue] = useState({ email: "" });
  const { serverUrl } = useContext(authContext);
  const navigate = useNavigate();
  const saveEmail = () => {
    localStorage.setItem("saveEmail", JSON.stringify(userEmailValue));
  };
  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserEmailValue({ ...userEmailValue, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/forgetPassword`,
        userEmailValue,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        saveEmail();
        toast.success(res.data.message);
        navigate("/verify-otp");
      }
    } catch (err) {
      toast.error(err?.response?.data.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-5">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white text-center">
          Forgot Password
        </h1>

        <p className="text-gray-400 text-center mt-3 leading-7">
          Enter your email address and we’ll send you an OTP to reset your
          password.
        </p>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-gray-300">Email Address</label>

            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl bg-black border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-500"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
