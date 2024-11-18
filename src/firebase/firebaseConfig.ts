import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa_N5ucuPwk1plf6nl-QV5C9itVu8QqNk",
  authDomain: "todoist-73a90.firebaseapp.com",
  projectId: "todoist-73a90",
  storageBucket: "todoist-73a90.appspot.com",
  messagingSenderId: "588351049627",
  appId: "1:588351049627:web:5474d7aa3d576e38509b3e",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
