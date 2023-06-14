import { initializeApp } from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIn7Qvp6getzvKbl72JAOdbahQhkQhono",
  authDomain: "servicioencomiendas-d7976.firebaseapp.com",
  projectId: "servicioencomiendas-d7976",
  storageBucket: "servicioencomiendas-d7976.appspot.com",
  messagingSenderId: "341114724362",
  appId: "1:341114724362:web:088dc2a07d35b20039bff3"
};


const app = initializeApp(firebaseConfig);

export default firebaseConfig