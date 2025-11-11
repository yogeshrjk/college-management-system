### 📢 Please Support the Original Repo!

> ✅ This is the original and actively maintained version of the project.
👉 [https://github.com/yogeshrjk/college-management-system](https://github.com/yogeshrjk/college-management-system)

If you find this project useful,  
**please consider giving it a ⭐ star and a 🍴 fork** to support development and help it reach more people!

📌 [Discussion: How to contribute](https://github.com/your-repo/discussions/123)

# 📚 MyCampus – College Management System

**MyCampus** is a full-stack college management system designed to streamline student registration, authentication, and profile management. Built with modern web technologies, it offers a responsive, user-friendly interface to simplify academic operations.

🌐 **Live Demo:** [https://www.my-campus.live](https://www.my-campus.live)

![MyCampus Demo](https://res.cloudinary.com/dhwpprvsb/image/upload/v1751170569/Screenshot_2025-06-29_at_9.21.32_AM_pkuglf.png)

[![GitHub stars](https://img.shields.io/github/stars/yogeshrjk/college-management-system)](https://github.com/yogeshrjk/college-management-system/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/yogeshrjk/college-management-system)](https://github.com/yogeshrjk/college-management-system/issues)
[![License](https://img.shields.io/github/license/yogeshrjk/college-management-system)](https://github.com/yogeshrjk/college-management-system/blob/main/LICENSE)

---

## 🚀 Features

- 📝 **Student Registration & Login**: Secure sign-up and login with form validation.
- 🔐 **Password Security**: Toggle visibility for password input.
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS and Lucide Icons.
- 📱 **Fully Responsive**: Optimized for desktop and mobile devices.
- 📊 **Profile Management**: Easy-to-use student profile system.
- 🤖 **AI Ask Feature**: Integrated chatbot powered by Groq API (LLaMA 3.1) to assist students with academic and general questions.

---

## 🛠️ Tech Stack

### Frontend

- **React.js** – Dynamic, component-based UI
- **Tailwind CSS** – Utility-first styling
- **React Router** – Seamless navigation
- **Apollo Client** – GraphQL data management
- **lucide-react** – Elegant icons
- **react-parallax-tilt** – Interactive UI effects

### Backend

- **Node.js** & **Express.js** – Robust server framework
- **GraphQL** & **Apollo Server** – Flexible API queries
- **MongoDB (Mongoose)** – Scalable database
- **bcrypt** – Secure password hashing
- **Apollo upload client** & **cloudinary** – File uploads and storage
- **cors** – Cross-origin resource sharing

---

## 📷 Screenshots

| Homepage                                                                                                              | Student Dashboard                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![Page](https://res.cloudinary.com/dhwpprvsb/image/upload/v1751170569/Screenshot_2025-06-29_at_9.22.28_AM_dntgfo.png) | ![Dashboard](https://res.cloudinary.com/dhwpprvsb/image/upload/v1751170569/Screenshot_2025-06-29_at_9.22.35_AM_ug5z5x.png) |

---

## 🧠 AI Ask – Chat with Campus Bot

A conversational AI assistant built using **Groq API** and **LLaMA 3.1** model.

### 🔍 Capabilities

- Answer academic questions and general doubts
- Friendly chat-style UI
- Message history saved in session

You can access this feature on the `/askai` route.

---

## 🧑‍💻 Getting Started

### 🧪 Test Credentials

You can use the following test credentials to log in:

- **Email:** johndoe@gmail.com
- **Password:** John@123

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (local or cloud instance)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yogeshrjk/college-management-system.git
   ```

2. **Frontend Setup**

   ```bash
   cd college-management-system/client
   npm install
   npm run dev
   ```

3. **Backend Setup**

   ```bash
   cd college-management-system/server
   npm install
   ```

4. **Environment Variables**
   Create a `.env` file in the `server/` folder and add:

   ```env
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PORT=5000
   ```

   Create a `.env` file in the `/client` folder and aa:

   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

5. **Run the Backend**
   ```bash
   node index.js
   ```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

---

## 🤝 Contributing

I welcome contributions! Follow these steps to contribute:

1. **Fork the Repository**
2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/college-management-system.git
   ```
3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make Changes** and **Commit**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push Changes**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Submit a Pull Request** on GitHub

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and check open [issues](https://github.com/yogeshrjk/college-management-system/issues) for tasks.

---

## 📜 License

This project is licensed under the [Apache Licens 2.0](https://www.apache.org/licenses/LICENSE-2.0).

---

## 🙋‍♂️ Author

**Yogesh Rajak**  
Frontend Developer | React.js Enthusiast  
📧 [yogeshrjk4@gmail.com](mailto:yogeshrjk4@gmail.com)  
🌐 [Portfolio](https://yogeshrjk.github.io)  
[![X](https://img.shields.io/badge/X--black?logo=x&logoColor=white&style=flat)](https://x.com/Yogesh_rjk)
[![LinkedIn](https://img.shields.io/badge/LinkedIn--blue?logo=linkedin&logoColor=white&style=flat)](https://www.linkedin.com/in/yogeshrajak/)

---

## 🌟 Show Your Support

- ⭐ **Star this repo** to help others find it!
- 📢 Share MyCampus on [X](https://x.com/intent/tweet?text=Check%20out%20MyCampus,%20a%20full-stack%20college%20management%20system!%20https://github.com/yogeshrjk/college-management-system)
- 📢 Share on [LinkedIn](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/yogeshrjkcollege-management-system) or other platforms.

- 💬 Join the discussion in [GitHub Discussions](https://github.com/yogeshrjk/college-management-system/discussions).

---
