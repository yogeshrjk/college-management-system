export const showAlert = (message, type = "success") => {
  const alert = document.createElement("div");

  alert.textContent = message;
  alert.className = `
    fixed top-0 left-1/2 transform -translate-x-1/2 -translate-y-full
    px-10 py-2 rounded shadow-md text-white z-50 opacity-0
    transition-all duration-500 ease-out
    ${type === "success" ? "bg-green-400" : "bg-red-400"}
  `;

  document.body.appendChild(alert);

  requestAnimationFrame(() => {
    alert.classList.remove("-translate-y-full", "opacity-0");
    alert.classList.add("translate-y-2", "opacity-100");
  });

  setTimeout(() => {
    alert.classList.remove("translate-y-4", "opacity-100");
    alert.classList.add("-translate-y-full", "opacity-0");

    setTimeout(() => {
      alert.remove();
    }, 500);
  }, 5000);
};
