import { Button } from "@/components/ui/button";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { authContext } from "@/Context/AuthContext";
import axios from "axios";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { userFullData, setUserFullData } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("first");
    try {
      const res = await axios.post(`${serverUrl}/api/v1/auth/login`, userData, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setUserData(res.data);
        localStorage.setItem("userAllData", JSON.stringify(res.data));
        navigate("/");
        console.log(res.data);
      }
    } catch (err) {
      toast.error(err?.response.data.message || "Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-950 p-5">
      {/* Card */}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
        <Card className="border-none bg-transparent shadow-none text-white ">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center tracking-wide">
              Login Account
            </CardTitle>

            <CardDescription className="text-center text-gray-400">
              Login up to continue your journey
            </CardDescription>

            <CardAction>
              <Button
                variant="link"
                className="text-blue-400 hover:text-blue-300"
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="m@example.com"
                    className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>

                    <Button
                      href="#"
                      className="text-sm text-blue-400 hover:text-blue-300 hover:underline bg-transparent"
                      onClick={() => navigate("/forget-password")}
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className=" absolute right-5 bottom-20 bg-transparent"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>
              </div>
              <CardFooter className="flex flex-col gap-3 mt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white hover:bg-blue-500"
                >
                  {loading ? <Loader className="animate-spin" /> : "Login"}
                </Button>

                {/* <Button
              variant="outline"
              className="w-full border-gray-700 bg-white/5 text-gray-200 hover:bg-white/10"
            >
              Continue with Google
            </Button> */}
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
