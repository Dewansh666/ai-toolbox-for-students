// src/js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ✅ Replace these values with your actual Firebase project config:
const firebaseConfig = {
  apiKey: "AIzaSyA3t3Ac-RR8NkPLl9wkSMqSDWa_p_Z1jmM",
  authDomain: "aniverse-b1175.firebaseapp.com",
  projectId: "aniverse-b1175",
  storageBucket: "aniverse-b1175.appspot.com",
  messagingSenderId: "209926836084",
  appId: "1:209926836084:web:c4fc01910702bc883f6621",
  measurementId: "G-VJFL0FP9FF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export for use in auth.js
export { auth };
