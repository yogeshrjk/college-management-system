import { useState } from "react";
import { SquareX } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import { showAlert } from "../../../utils/showAlert";

export const ChangePass = (props) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const CHANGE_PASSWORD = gql`
    mutation ChangePassword(
      $_id: ID!
      $oldPassword: String!
      $newPassword: String!
    ) {
      changePassword(
        _id: $_id
        oldPassword: $oldPassword
        newPassword: $newPassword
      )
    }
  `;
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        showAlert("New password and confirm password do not match.", "error");
        return;
      }
      const user = props.data?.getUser;

      const { data } = await changePassword({
        variables: { _id: user._id, oldPassword, newPassword },
      });
      if (data && data.changePassword) {
        showAlert("password changed successfully!", "success");
        console.log("Update result:", data.changePassword);
      } else {
        showAlert("Failed to change password.", "error");
      }
    } catch (err) {
      console.error("Update error:", err);
      showAlert("Old password not Matched.", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 m-auto bg-white dark:bg-black/10 backdrop-blur-sm dark:text-white shadow-md md:rounded-lg p-6 flex flex-col gap-2 w-full max-w-md sm:h-fit">
      <div className="flex items-center justify-between mb-5">
        <div className="text-lg font-semibold"> Change Password</div>
        <div>
          <SquareX
            className="w-6 h-6 hover:text-red-500"
            onClick={props.onClose}
          />
        </div>
      </div>
      <div className="flex-1 space-y-3">
        <form action="" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="relative w-full">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Old Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                className="w-full px-3 py-1 mt-1 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#103d46]"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`bi ${
                  showOldPassword ? "bi-eye-slash" : "bi-eye"
                } absolute top-8 right-3 cursor-pointer`}
                width="16"
                height="16"
                fill="grey"
                viewBox="0 0 16 16"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
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
            <div className="relative w-full">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-1 mt-1 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#103d46]"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`bi ${
                  showPassword ? "bi-eye-slash" : "bi-eye"
                } absolute top-8 right-3 cursor-pointer`}
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
            <div className="relative w-full">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Confirm New Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-1 mt-1 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#103d46]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`bi ${
                  showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                } absolute top-8 right-3 cursor-pointer`}
                width="16"
                height="16"
                fill="grey"
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
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#103d46] text-white text-sm px-4 py-2 mt-5 rounded-md hover:bg-[#0b2e36]"
                onClick={handleSubmit}
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
