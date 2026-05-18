// Home.jsx

import { authContext } from "@/Context/AuthContext";
import axios from "axios";
import { Loader } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("userAllData"));

  const token = user?.accessToken;

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { serverUrl } = useContext(authContext);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        localStorage.removeItem("userAllData");

        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-5">
      <div className="w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-blue-600 h-30 relative flex items-center justify-center">
          <div className="absolute bottom-[-60px] h-36 w-36 rounded-full bg-black border-4 border-gray-900 flex items-center justify-center text-6xl font-bold text-white">
            {user?.user?.username?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="pt-24 pb-10 px-8 text-center">
          <h1 className="text-5xl font-bold text-white">
            {user?.user?.username}
          </h1>

          <p className="text-gray-400 text-lg mt-3">{user?.user?.email}</p>

          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <span className="px-5 py-2 rounded-full bg-green-500/20 border border-green-500 text-green-400 font-medium">
              {user?.user?.isVerified ? "Verified Account" : "Not Verified"}
            </span>

            <span className="px-5 py-2 rounded-full bg-blue-500/20 border border-blue-500 text-blue-400 font-medium">
              {user?.user?.isLoggedIn ? "Currently Online" : "Offline"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-gray-500 text-sm mb-3">Account Status</h2>

              <p className="text-white text-xl font-semibold">Active</p>
            </div>

            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-gray-500 text-sm mb-3">User ID</h2>

              <p className="text-white text-sm break-all">{user?.user?._id}</p>
            </div>

            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-gray-500 text-sm mb-3">Email Status</h2>

              <p className="text-white text-xl font-semibold">Verified</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12 flex-wrap">
            <button className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500">
              Edit Profile
            </button>

            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white font-semibold hover:bg-gray-700 flex items-center justify-center"
            >
              {loading ? <Loader className="animate-spin" /> : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
