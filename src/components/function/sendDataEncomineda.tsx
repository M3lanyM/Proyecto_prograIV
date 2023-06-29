import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import firebaseConfig from "@/firebase/app";
import { initializeApp } from "firebase/app";

export const sendDataEnco = async (peso:number,altura:number,ancho:number,route:string,
    price:number,dest:string,date:Date) => {

    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);

    const dataToAdd = {
        altura: altura,
        ancho: ancho,
        destinatario: doc(database,"destinatario",dest),
        ruta: doc(database,"ruta",route),
        fecha:date,
        peso:peso,
        precio: price,
    };

    try {
        const docRef = await addDoc(collection(database, "encomienda"), dataToAdd);
        console.log("Encomienda agregado con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al agregar la encomienda a Firebase:", error);
    }
};