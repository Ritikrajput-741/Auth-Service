import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./Pages/ForgetPassword";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NewPassword from "./Pages/NewPassword";
import Signup from "./Pages/Signup";
import Verify from "./Pages/Verify";
import VerifyEmail from "./Pages/VerifyEmail";
import VerifyOtp from "./Pages/VerifyOtp";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },

  {
    path: "/verify",
    element: <Verify />,
  },

  {
    path: "/verify/:token",
    element: <VerifyEmail />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/reset-password",
    element: <NewPassword />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-right" />
    </>
  );
};

export default App;
