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