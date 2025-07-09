import { gql, useQuery } from "@apollo/client";
import { User, LogOut, Settings } from "lucide-react";

export const ProfileDropdown = (props) => {
  const GET_USER = gql`
    query GetUser($id: ID!) {
      getUser(id: $id) {
        firstName
        lastName
        email
      }
    }
  `;

  const userId = localStorage.getItem("userId");
  console.log("Retrieved userId in dropdown:", userId);
  if (!userId) {
    console.error("No user ID found in localStorage.");
    return null;
  }
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return null;
  if (error) {
    console.error("Failed to load user info", error);
    return null;
  }

  const userInfo = data?.getUser;

  return (
    <div
      className={`flex flex-col w-50 gap-1 absolute right-2 top-15 z-30 bg-white dark:bg-black/20 backdrop-blur-md p-4 text-sm rounded-md shadow-2xl ${
        props.isOpen ? "" : ""
      } md:${props.isOpen ? "flex" : ""} `}
    >
      <div className="flex flex-col p-1">
        <span className="font-bold">
          {userInfo.firstName} {userInfo.lastName}
        </span>
        <span className="text-xs text-gray-500">{userInfo.email}</span>
      </div>
      <hr className="border-t border-gray-200" />
      <div className="py-1">
        <div
          onClick={() => {
            props.setShowProfile(true);
          }}
          className="flex gap-1 items-center hover:bg-black/10 hover:dark:bg-white/10 cursor-pointer p-1 rounded-sm"
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </div>
        <div
          onClick={() => {
            props.setShowSettings(true);
          }}
          className="flex gap-1 items-center hover:bg-black/10 hover:dark:bg-white/10 cursor-pointer p-1 rounded-sm"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </div>
      </div>
      <hr className="border-t border-gray-200 " />
      <div
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          window.location.href = "/";
        }}
        className="flex gap-1 items-center text-red-500 hover:bg-black/10 hover:dark:bg-white/10 cursor-pointer p-1 rounded-sm"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out</span>
      </div>
    </div>
  );
};
