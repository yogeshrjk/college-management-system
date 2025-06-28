import { useState, useEffect } from "react";
import axios from "axios";
import { GraduationCap } from "lucide-react";
import Tilt from "react-parallax-tilt";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  //logic to hide alert msg
  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //check password and confirm password are matched or not
      if (formData.password !== formData.confirmPassword) {
        setAlert({
          type: "error",
          message: "Please make sure both passwords match.",
        });
        return;
      }
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "confirmPassword") {
          data.append(key, value);
        }
      });
      //upload profile pic
      if (selectedFile) {
        data.append("profilePic", selectedFile);
      }
      // Send form data to backend API for user registration
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/signup`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res.data);
      setAlert({ type: "success", message: "Signup successful!" });
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data || "Signup failed. Try again.",
      });
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      {alert.message && (
        <div
          className={`absolute top-5 p-2 px-10 mb-4 text-sm font-medium text-center rounded ${
            alert.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}
      <div className="flex rounded-2xl shadow-lg max-w-3xl p-5 items-center bg-white">
        <Tilt
          className="md:block hidden w-1/2"
          perspective={500}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          scale={1.04}
        >
          <img
            src="./img3.jpg"
            className="rounded-2xl"
            alt="Login Background"
          />
        </Tilt>
        <div className="flex sm:py-5 rounded-2xl items-center w-full sm:w-auto h-screen sm:h-auto">
          <div className="w-full px-8">
            <div className="flex gap-2 justify-center items-center">
              <GraduationCap className="w-8 h-8 text-[#103D46]" />
              <span className="font-bold text-2xl text-[#103D46] text-center">
                MyCampus
              </span>
            </div>
            <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
              {/* First Name & Last Name */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-[#103D46]">
                    First Name
                  </label>
                  <input
                    className="p-1 rounded-sm text-sm border w-full text-gray-700"
                    type="text"
                    placeholder="e.g. John"
                    required
                    name="firstName"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-[#103D46]">
                    Last Name
                  </label>
                  <input
                    className="p-1 rounded-sm text-sm border w-full text-gray-700"
                    type="text"
                    placeholder="e.g. Doe"
                    required
                    name="lastName"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone Number & Date of Birth */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-[#103D46]">
                    Phone Number
                  </label>
                  <input
                    className="p-1 rounded-sm text-sm border w-full text-gray-700"
                    type="tel"
                    placeholder="+91 9876543210"
                    required
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-[#103D46]">
                    Date of Birth
                  </label>
                  <input
                    className="p-1 rounded-sm text-sm border w-full text-gray-700"
                    type="date"
                    required
                    name="dob"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email & Gender (Email is wider than Gender) */}
              <div className="flex gap-4">
                <div className="w-2/3">
                  <label className="block text-sm font-semibold text-[#103D46]">
                    Email
                  </label>
                  <input
                    className="p-1 rounded-sm text-sm border w-full text-gray-700"
                    type="email"
                    placeholder="example@email.com"
                    required
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-semibold text-[#103D46]">
                    Gender
                  </label>
                  <select
                    className="p-1 rounded-sm text-sm border w-full text-gray-700"
                    required
                    defaultValue=""
                    name="gender"
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="relative">
                <label className="block text-sm font-semibold text-[#103D46]">
                  Password
                </label>
                <input
                  className="p-1 pr-10 rounded-sm text-sm border w-full text-gray-700"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter strong password"
                  required
                  name="password"
                  onChange={handleChange}
                />
                {/* Toggle Password Visibility */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  } absolute top-7 right-3 cursor-pointer`}
                  width="16"
                  height="16"
                  fill="black"
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

              {/* Confirm Password Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-[#103D46]">
                  Confirm Password
                </label>
                <input
                  className="p-1 pr-10 rounded-sm text-sm border w-full text-gray-700"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  required
                  name="confirmPassword"
                  onChange={handleChange}
                />
                {/* Toggle Confirm Password Visibility */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`bi ${
                    showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                  } absolute top-7 right-3 cursor-pointer`}
                  width="16"
                  height="16"
                  fill="black"
                  viewBox="0 0 16 16"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
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

              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-semibold text-[#103D46]">
                  Profile Picture
                </label>
                <input
                  className="p-1 mt-2 rounded-sm text-sm border w-full text-gray-700"
                  type="file"
                  name="profilePic"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>

              {/* Sign Up Button */}
              <button
                className="p-1 mt-4 rounded-sm font-bold text-sm text-white bg-[#103D46] hover:scale-105 duration-300 w-full"
                type="submit"
              >
                Sign Up
              </button>
            </form>
            {/* Login button */}
            <div className="mt-3 text-xs flex justify-between items-center text-[#103D46]">
              <p className="text-sm">Already have an account?</p>
              <button className="py-1 px-5 bg-black/10 border rounded-md hover:scale-110 ">
                <a href="/">Login</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
