// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAN6kIzydRFze_fwhnzM-ybPHPIl2ih-QA",
  authDomain: "bdnosql-1fc8e.firebaseapp.com",
  projectId: "bdnosql-1fc8e",
  storageBucket: "bdnosql-1fc8e.firebasestorage.app",
  messagingSenderId: "638366527814",
  appId: "1:638366527814:web:7ab3aac66736dd81e93547",
  measurementId: "G-JXJ8F9962V"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
