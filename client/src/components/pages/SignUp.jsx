import { useState, useEffect } from "react";
import axios from "axios";
import { GraduationCap } from "lucide-react";
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
  // formData.append("profilePic", selectedFile);
  // axios.post("http://192.168.31.246:8000/api/users/upload-profile", formData, {
  //   headers: { "Content-Type": "multipart/form-data" },
  // });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        setAlert({ type: "error", message: "Passwords do not match" });
        return;
      }
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "confirmPassword") {
          data.append(key, value);
        }
      });
      if (selectedFile) {
        data.append("profilePic", selectedFile);
      }

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
      <div className="flex sm:py-10 rounded-2xl shadow-lg items-center bg-white w-full sm:w-auto h-screen sm:h-auto">
        <div className="w-full px-8 md:px-16">
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
                className="bi bi-eye absolute top-7 right-3 cursor-pointer"
                width="16"
                height="16"
                fill="black"
                viewBox="0 0 16 16"
                onClick={() => setShowPassword(!showPassword)}
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
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
                className="bi bi-eye absolute top-7 right-3 cursor-pointer"
                width="16"
                height="16"
                fill="black"
                viewBox="0 0 16 16"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
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
          <div className="mt-3 text-xs flex justify-between items-center text-[#103D46]">
            <p className="text-sm">Already have an account?</p>
            <button className="py-1 px-5 bg-black/10 border rounded-md hover:scale-110 ">
              <a href="/">Login</a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
