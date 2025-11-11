import { useState } from "react";
import { showAlert } from "../../../utils/showAlert";
import { SquareX, Pencil } from "lucide-react";
import { gql, useMutation } from "@apollo/client";

export default function Profile(props) {
  const [email, setEmail] = useState(props.data.getUser.email || "");
  const [dob, setDob] = useState(props.data.getUser.dob || "");
  const [phone, setPhone] = useState(props.data.getUser.phoneNumber || "");
  const [gender, setGender] = useState(props.data.getUser.gender || "");

  const UPDATE_USER = gql`
    mutation UpdateUser(
      $_id: ID!
      $email: String
      $dob: String
      $phoneNumber: String
      $gender: String
    ) {
      updateUser(
        _id: $_id
        email: $email
        dob: $dob
        phoneNumber: $phoneNumber
        gender: $gender
      ) {
        _id
        email
        dob
        phoneNumber
        gender
      }
    }
  `;

  const [updateUser] = useMutation(UPDATE_USER);

  const handleUpdate = async () => {
    try {
      const user = props.data?.getUser;
      console.log("USER DATA:", props.data?.getUser);

      if (!user || !user._id) {
        showAlert("User ID is missing. Cannot update profile.", "error");
        return;
      }

      const variables = {
        _id: user._id,
        email,
        dob,
        phoneNumber: phone,
        gender,
      };

      const { data } = await updateUser({ variables });

      if (data && data.updateUser) {
        showAlert("Profile updated successfully!", "success");
        console.log("Update result:", data.updateUser);
      } else {
        showAlert("Failed to update profile.", "error");
      }
    } catch (err) {
      console.error("Update error:", err);
      showAlert("Error updating profile.", "error");
    }
  };
  if (!props.data || !props.data.getUser) {
    return <div>Loading profile...</div>;
  }
  // const userInfo = props.data?.getUser;
  return (
    <div className="fixed inset-0 z-50 m-auto bg-white dark:bg-black/20 backdrop-blur-sm shadow-md md:rounded-lg p-8 flex flex-col gap-2 w-full max-w-md sm:h-fit">
      <div className="flex justify-end">
        <SquareX
          className="w-6 h-6 hover:text-red-500"
          onClick={props.onClose}
        />
      </div>
      {/* Profile Photo */}
      <div className="flex flex-col items-center">
        <div className="relative group w-25 h-25">
          <img
            src={props.data.getUser.profilePic}
            alt="Profile"
            className="w-25 h-25 rounded-full object-cover shadow-[#103d46] ring-2 shadow-md"
          />
          <div className="absolute bottom-0 left-0 p-5 w-full h-full bg-black/50 rounded-full flex justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-200">
            <Pencil className="absolute bottom-5 left-1/2 -translate-x-1/2 w-9 h-9 text-white p-1" />
          </div>
        </div>
        <span className="text-xl font-semibold mt-2">
          {props.data.getUser.firstName} {props.data.getUser.lastName}
        </span>
      </div>

      {/* Editable Fields */}
      <div className="flex-1 space-y-3">
        <EditableField label="Email" value={email} onChange={setEmail} />
        <EditableField label="Date of Birth" value={dob} onChange={setDob} />
        <EditableField label="Phone Number" value={phone} onChange={setPhone} />
        <EditableField label="Gender" value={gender} onChange={setGender} />
        <div>
          <button
            className="bg-[#103d46] w-full text-white text-sm px-4 py-2 rounded-md hover:bg-[#0b2e36]"
            onClick={props.onChangePassword}
          >
            Change Password
          </button>
        </div>
        <div className="flex justify-end">
          <button
            className=" bg-[#103d46] text-white text-sm px-4 py-2 rounded-md hover:bg-[#0b2e36]"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function EditableField({ label, value, onChange }) {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {editing ? (
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#103d46"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          autoFocus
        />
      ) : (
        <div
          className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
          onClick={() => setEditing(true)}
        >
          {value || "Click to edit"}
        </div>
      )}
    </div>
  );
}
