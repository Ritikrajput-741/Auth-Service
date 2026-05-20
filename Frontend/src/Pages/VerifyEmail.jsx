import { authContext } from "@/Context/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const VerifyEmail = () => {
  const { token } = useParams();

  const [status, setStatus] = useState("Verifying...");
  const [success, setSuccess] = useState(false);

  const { serverUrl } = useContext(authContext);

  const navigate = useNavigate();

  useEffect(() => {
    const verifySuccess = async () => {
      try {
        const res = await axios.post(
          `${serverUrl}/api/v1/auth/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) {
          setSuccess(true);
          setStatus("Verified Successfully ✅");

          toast.success(res.data.message);

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        setSuccess(false);

        const message =
          error?.response?.data?.message || "Something went wrong";

        setStatus("Verification Failed ❌");

        toast.error(message);

        console.log(message);
      }
    };

    if (token) {
      verifySuccess();
    }
  }, [token, serverUrl, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-5">
      <div className="w-full max-w-lg rounded-3xl border border-gray-700 bg-gray-900 shadow-lg p-10 text-center">
        <div className="flex justify-center mb-6">
          <div
            className={`h-20 w-20 rounded-full flex items-center justify-center text-4xl border
              ${
                success
                  ? "bg-green-500/20 border-green-500"
                  : "bg-red-500/20 border-red-500"
              }`}
          >
            {success ? "✅" : "❌"}
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">{status}</h1>

        <p className="text-gray-400 text-lg leading-8">
          {success
            ? "Your account has been verified successfully. You can now login and continue using your account."
            : "We could not verify your email. Please try again or request a new verification email."}
        </p>

        <p className="text-gray-500 text-sm mt-6">
          Thank you for using our platform.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-500 transition"
        >
          Continue to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
