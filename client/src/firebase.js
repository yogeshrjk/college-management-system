// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhHhhVLXbufor_b_utAIrjv4mnLG7TodU",
  authDomain: "mycampus-672df.firebaseapp.com",
  projectId: "mycampus-672df",
  storageBucket: "mycampus-672df.appspot.com",
  messagingSenderId: "743548627891",
  appId: "1:743548627891:web:9082dfe4adbdd3932c39c6",
  measurementId: "G-BRLN7ZNDJE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);
