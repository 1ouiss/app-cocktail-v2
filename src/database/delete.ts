import { deleteDoc, doc } from "firebase/firestore";
import {db} from "../firebase";

export const deleteDbDoc = async ({
  collection,
  docId,
}: {
  collection: string;
  docId: string;
}) => {
  const docRef = doc(db, collection, docId);
  await deleteDoc(docRef);
  console.log("Document successfully deleted!");
  return "Document successfully deleted!";
};
