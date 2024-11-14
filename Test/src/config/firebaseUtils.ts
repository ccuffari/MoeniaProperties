import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Definisci il tipo del documento Firestore (opzionale, per migliorare i tipi)
interface PropertyData {
  title: string;
}

export async function getTitle(): Promise<string | null> {
  const docRef = doc(db, "properties", "gfnUqQX58eoUACUPLwmg");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data() as PropertyData;
    return data.title;
  } else {
    console.log("Documento non trovato!");
    return null;
  }
}
