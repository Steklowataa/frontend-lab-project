import { db } from "@/app/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchUserProfileData = async (userId: string) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error("Error fetching user profile data from Firestore:", error);
        throw new Error("Could not fetch user profile data.");
    }
};
