// app/scripts/seedTraining.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// --- KONFIGURACJA FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyAcsl7RBsiuiOKdV-nOU8I8czOVS72KSb0",
  authDomain: "gym-application-519ec.firebaseapp.com",
  projectId: "gym-application-519ec",
  storageBucket: "gym-application-519ec.firebasestorage.app",
  messagingSenderId: "478137383214",
  appId: "1:478137383214:web:c62a5a72e8ebf1ebdc22bf"
};

// Inicjalizacja Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// --- DANE DO SEEDOWANIA ---
const lessons = [
  { name: "Pilates", category: "Body&Mind" },
  { name: "Yoga", category: "Body&Mind" },
  { name: "Zdrowy Kręgosłup", category: "Body&Mind" },
  { name: "Zumba", category: "Taneczne" },
  { name: "Aerobik", category: "Taneczne" },
  { name: "Boks", category: "Sztuki walki" },
  { name: "Judo", category: "Sztuki walki" },
  { name: "Sztangi", category: "Strength" },
  { name: "Rowery", category: "Cardio" },
  { name: "Tabata", category: "Cardio" },
  { name: "Full body workout", category: "Strength" },
  { name: "Aqua aerobic", category: "Wodne" },
  { name: "Aqua dance", category: "Wodne" },
  { name: "Kettlebells", category: "Strength" },
];

const instructors = ["Anna Nowikowa", "Jan Kowalski", "Ewa Wiśniewska", "Piotr Nowak", "Katarzyna Zielińska"];

const schedule: Record<
  "pon" | "wt" | "sr" | "czw" | "pt" | "sb" | "nd",
  { start: number; end: number }
> = {
  pon: { start: 8, end: 20 },
  wt:  { start: 8, end: 20 },
  sr:  { start: 8, end: 20 },
  czw: { start: 8, end: 20 },
  pt:  { start: 8, end: 20 },
  sb:  { start: 9, end: 21 },
  nd:  { start: 10, end: 19 },
};

// Funkcja losująca element z tablicy
function shuffle<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// --- SEEDOWANIE TRENINGÓW ---
async function seedTrainings() {
  let idCounter = 1;

  for (const dayKey of Object.keys(schedule)) {
    const day = dayKey as keyof typeof schedule;
    const { start, end } = schedule[day];

    for (let hour = start; hour <= end; hour++) {
      const lesson = shuffle(lessons);

      const training = {
        id: idCounter.toString(),
        day: day,
        hour: hour,
        trainingTime: 55,
        categorie: lesson.category,
        name: lesson.name,
        instructure: shuffle(instructors),
        availablePlaces: Math.floor(Math.random() * 10) + 5,
        occupiedPlaces: Math.floor(Math.random() * 5)
      };

      const ref = doc(collection(db, "trainings"), training.id);
      await setDoc(ref, training);

      console.log(`Dodano: ${training.day} godz. ${training.hour} - ${training.name}`);
      idCounter++;
    }
  }

  console.log("Wszystkie zajęcia dodane!");
}

seedTrainings().catch(console.error);
