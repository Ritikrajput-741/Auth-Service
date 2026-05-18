import { authContext } from "@/Context/AuthContext";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NewPassword = () => {

  const [userPassword, setUserPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { serverUrl } = useContext(authContext);

  const navigate = useNavigate();

  const userEmail = JSON.parse(
    localStorage.getItem("saveEmail")
  );

  const email = userEmail?.email;

  const handleChange = (e) => {

    const { name, value } = e.target;

    setUserPassword({
      ...userPassword,
      [name]: value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${serverUrl}/api/v1/auth/confirm-password/${email}`,
        userPassword
      );

      if (res.data.success) {

        toast.success(res.data.message);

        localStorage.removeItem("saveEmail");

        navigate("/login");

      }

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-5">

      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-white text-center">
          Reset Password
        </h1>

        <p className="text-gray-400 text-center mt-3 leading-7">
          Create a new password for your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">

              <label className="text-gray-300">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full rounded-xl bg-black border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

            </div>

            <div className="flex flex-col gap-2">

              <label className="text-gray-300">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full rounded-xl bg-black border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

            </div>

          </div>

          <button
            type="submit"
            className="w-full mt-8 rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-500"
          >
            Confirm Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default NewPassword;