import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseConfig from "@/firebase/app";
import { initializeApp } from "firebase/app";

export const sendDataToFirebase = async (name:string,last:string,mail:string,num:string) => {
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);

    const dataToAdd = {
        apellido:last,
        email:mail,
        nombre:name,
        telefono:num,
        // Otros campos y valores que desees enviar a Firebase
    };

    try {
        const docRef = await addDoc(collection(database, "destinatario"), dataToAdd);
        console.log("Documento agregado con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al agregar el documento a Firebase:", error);
    }
};