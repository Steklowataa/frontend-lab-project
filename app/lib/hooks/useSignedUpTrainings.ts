import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../firebase/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import type { SignedUpTraining } from "../types/training";

export function useSignedUpTrainings() {
  const { user } = useAuth();
  const [signedUpTrainings, setSignedUpTrainings] = useState<SignedUpTraining[]>([]);

  useEffect(() => {
    const fetchSignedUpTrainings = async () => {
      if (!user) {
        setSignedUpTrainings([]);
        return;
      }
      try {
        const q = query(
          collection(db, "users", user.uid, "signedUpTrainings"),
          orderBy("date", "asc")
        );
        const querySnapshot = await getDocs(q);
        const trainings = querySnapshot.docs.map(doc => ({
          ...(doc.data() as Omit<SignedUpTraining, 'docId'>),
          docId: doc.id,
        }));
        setSignedUpTrainings(trainings);
      } catch (error) {
        console.error("Error fetching signed up trainings:", error);
      }
    };

    fetchSignedUpTrainings();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedTrainings = signedUpTrainings.filter(t => {
        const trainingEndDate = new Date(t.date);
        trainingEndDate.setHours(trainingEndDate.getHours() + 1);
        return trainingEndDate > now;
      });

      if (updatedTrainings.length !== signedUpTrainings.length) {
        setSignedUpTrainings(updatedTrainings);
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [signedUpTrainings]);

  return { signedUpTrainings, setSignedUpTrainings };
}
