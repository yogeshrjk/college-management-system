import { useState, useEffect } from "react";
import { SquareX } from "lucide-react";

const Settings = ({ onClose }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [language, setLanguage] = useState("English");
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  useEffect(() => {
    if (language === "Hindi") {
      const addGoogleTranslate = () => {
        if (!document.getElementById("google-translate-script")) {
          const script = document.createElement("script");
          script.id = "google-translate-script";
          script.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
          document.body.appendChild(script);
        }

        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "hi",
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        };
      };

      addGoogleTranslate();
    }
  }, [language]);

  const handleSave = () => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    console.log("Preferences saved:", {
      darkMode,
      language,
      emailNotif,
      smsNotif,
    });
    onClose();
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 m-auto bg-white dark:bg-black/20 backdrop-blur-sm dark:text-white shadow-md md:rounded-lg p-8 flex flex-col gap-2 w-full max-w-md sm:h-fit">
        <div className="flex justify-end">
          <SquareX className="w-6 h-6 hover:text-red-500" onClick={onClose} />
        </div>
        <div className="text-xl font-semibold mb-4">Settings</div>

        <div className="flex-1 space-y-3">
          <ToggleField
            label="Dark Mode"
            value={darkMode}
            onChange={() => {
              const newValue = !darkMode;
              setDarkMode(newValue);
              if (newValue) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
              } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
              }
            }}
          />
          <SelectField
            label="Language"
            value={language}
            options={["English", "Hindi", "Spanish"]}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <ToggleField
            label="Email Notifications"
            value={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
          />
          <ToggleField
            label="SMS Notifications"
            value={smsNotif}
            onChange={() => setSmsNotif(!smsNotif)}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-[#103d46] text-white text-sm px-4 py-2 rounded-md hover:bg-[#0b2e36]"
            >
              Save Preferences
            </button>
          </div>
        </div>
        <div id="google_translate_element" className="hidden"></div>
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
      <p className="text-xs text-gray-500 mb-1">
        Choose your preferred language for the interface.
      </p>
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
