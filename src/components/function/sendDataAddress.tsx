import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseConfig from "@/firebase/app";
import { initializeApp } from "firebase/app";

export const sendDataToFirebase = async (name: string, last: string, mail: string, num: string) => {
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);

    /*frame body for firebase*/
    const dataToAdd = {
        apellido: last,
        email: mail,
        nombre: name,
        telefono: num,
    };

    /*send data to firebase*/
    try {
        const docRef = await addDoc(collection(database, "destinatario"), dataToAdd);
        console.log("Destinatario agregado con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al agregar el destinatario a Firebase:", error);
    }
};