import { useState } from "react";
import { SquareX } from "lucide-react";

const defaultTexts = {
  title: "Settings",
  darkMode: "Dark Mode",
  language: "Language",
  emailNotif: "Email Notifications",
  smsNotif: "SMS Notifications",
  save: "Save Preferences",
  languageHelp: "Choose your preferred language for the interface.",
};

const Settings = ({ onClose }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const handleSave = () => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    onClose();
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 m-auto bg-white dark:bg-black/10 backdrop-blur-sm dark:text-white shadow-md md:rounded-lg p-6 flex flex-col gap-2 w-full max-w-md sm:h-fit">
        <div className="flex items-center justify-between mb-5">
          <div className="text-xl font-semibold mb-4">{defaultTexts.title}</div>

          <div>
            <SquareX className="w-6 h-6 hover:text-red-500" onClick={onClose} />
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <ToggleField
            label={defaultTexts.darkMode}
            value={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-[#103d46] text-white text-sm px-4 py-2 mt-5 rounded-md hover:bg-[#0b2e36]"
            >
              {defaultTexts.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function ToggleField({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="form-checkbox w-5 h-5"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#103d46]"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default Settings;
