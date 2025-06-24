import { useEffect, useState } from "react";
import axios from "axios";
import { User, LogOut, Settings } from "lucide-react";

export const ProfileDropdown = ({ isOpen }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/685ab7247ab69663853ff554`
        );

        const data = res.data;
        setUserInfo({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      } catch (error) {
        console.error("Failed to load user info", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div
      className={`flex flex-col w-50 gap-1 absolute right-2 top-15 z-30 bg-white p-4 text-sm rounded-md shadow-2xl ${
        isOpen ? "hidden" : ""
      } md:${isOpen ? "flex" : ""} `}
    >
      <div className="flex flex-col p-1">
        <span className="font-bold">
          {userInfo.firstName} {userInfo.lastName}
        </span>
        <span className="text-xs text-gray-500">{userInfo.email}</span>
      </div>
      <hr className="border-t border-gray-200" />
      <div className="py-1">
        <div className="flex gap-1 items-center hover:bg-black/10 cursor-pointer p-1 rounded-sm">
          <User className="w-4 h-4" />
          <span>Profile</span>
        </div>
        <div className="flex gap-1 items-center hover:bg-black/10 cursor-pointer p-1 rounded-sm">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </div>
      </div>
      <hr className="border-t border-gray-200 " />
      <div className="flex gap-1 items-center text-red-500 hover:bg-black/10 cursor-pointer p-1 rounded-sm">
        <LogOut className="w-4 h-4" />
        <span>Log Out</span>
      </div>
    </div>
  );
};
