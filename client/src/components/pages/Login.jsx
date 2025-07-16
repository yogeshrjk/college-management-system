import { useState, useEffect } from "react";
import { Mail, LockKeyhole } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //dark theme
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "light"
  );
  // Sync dark mode with document and localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  //prevent accessing login page if already logged in
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        _id
        email
        token
      }
    }
  `;

  const [login, { loading, error }] = useMutation(LOGIN);

  const handleSubmit = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      if (loading) {
        return (
          <div className="fixed inset-0 bg-white/20 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <img src="logo1.gif" alt="Loading" className="w-30 h-30" />
          </div>
        );
      }
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("userId", data.login._id);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 relative">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => {
            const newMode = !darkMode;
            setDarkMode(newMode);
            const theme = newMode ? "dark" : "light";
            localStorage.setItem("theme", theme);
            if (theme === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }}
          className="text-xl text-[#103D46] dark:text-white"
          title="Toggle Dark Mode"
        >
          🌓
        </button>
      </div>
      <div className="flex rounded-2xl shadow-lg max-w-3xl p-5 items-center bg-white dark:bg-gray-900 ">
        <div className="md:w-1/2 p-5 md:px-12">
          <div className="flex flex-col gap-2 justify-center items-center">
            <img src="logo1.gif" alt="logo" className="w-15 h-15" />
            <span className="font-bold text-2xl text-[#103D46] dark:text-white text-center">
              MyCampus
            </span>
          </div>
          <form action="" className="flex flex-col gap-2 mt-6">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-2 top-5 flex items-center text-gray-500 dark:text-white">
                <Mail className="w-4 h-4 text-[#103D46] dark:text-white" />
              </span>
              <input
                className="pl-8 p-1 mt-5 w-full rounded-md text-sm border focus:border-black-500 outline-none"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative w-full">
              <span className="absolute inset-y-0 left-2 top-2 flex items-center text-gray-500 dark:text-white">
                <LockKeyhole className="w-4 h-4 text-[#103D46] dark:text-white" />
              </span>
              <input
                className="p-1 mt-2 pl-8 rounded-md text-sm border w-full focus:border-black-500 outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`bi ${
                  showPassword ? "bi-eye-slash" : "bi-eye"
                } absolute top-4 right-3 cursor-pointer`}
                width="16"
                height="16"
                fill="grey"
                viewBox="0 0 16 16"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <>
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </>
                ) : (
                  <>
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                  </>
                )}
              </svg>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="py-2 mt-2 rounded-md border border-none text-sm text-[#ffffff] text-center bg-[#103D46] hover:scale-105 duration-300"
            >
              Login
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error.message}</p>
            )}
          </form>

          <div className="mt-4 grid grid-cols-3 items-center text-gray-400 dark:text-white">
            <hr className="border-gray-400" />
            <p className="text-center text-xs text-black dark:text-white">OR</p>
            <hr className="border-gray-400" />
          </div>

          <div className="mt-2 text-xs border-b border-[#103D46] dark:border-gray-400 py-4 text-[#103D46] dark:text-white">
            <a href="#">
              <p className="text-[#103D46] dark:text-white">
                Forgot your password?
              </p>
            </a>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#103D46] dark:text-white">
            <p>Don't have an account?</p>
            <Link
              to="/signup"
              className="py-2 px-6 bg-[#103D46] text-white text-xs text-center ml-2 rounded-md hover:scale-110"
            >
              <button>SignUp</button>
            </Link>
          </div>
        </div>

        <Tilt
          className="md:block hidden w-1/2"
          perspective={500}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          scale={1.04}
        >
          <img
            src="login_bg.jpg"
            className="rounded-2xl"
            alt="Login Background"
          />
        </Tilt>
      </div>
    </section>
  );
}
