import { useState, useEffect } from "react";
import { User, updateProfile } from "firebase/auth";
import { db } from "@/app/lib/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { fetchUserProfileData } from "@/app/lib/functions/user";

interface UserProfile {
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  height: string;
  weight: string;
}

export const useUserProfile = (user: User | null) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileData, setProfileData] = useState<UserProfile>({
    address: { street: "", city: "", zipCode: "" },
    height: "",
    weight: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const loadProfileData = async () => {
        setIsLoading(true);
        try {
          const fetchedData = await fetchUserProfileData(user.uid);
          if (fetchedData) {
            setProfileData({
              address: fetchedData.address || { street: "", city: "", zipCode: "" },
              height: fetchedData.height?.toString() || "",
              weight: fetchedData.weight?.toString() || "",
            });
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setError("Nie udało się wczytać danych profilu.");
        } finally {
          setIsLoading(false);
        }
      };
      loadProfileData();
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (["street", "city", "zipCode"].includes(name)) {
      setProfileData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("Musisz być zalogowany, aby zaktualizować profil.");
      return;
    }

    const formElements = e.currentTarget.elements;
    const data = {
      displayName: (formElements.namedItem("displayName") as HTMLInputElement).value,
      photoURL: (formElements.namedItem("photoURL") as HTMLInputElement).value,
      street: (formElements.namedItem("street") as HTMLInputElement).value,
      city: (formElements.namedItem("city") as HTMLInputElement).value,
      zipCode: (formElements.namedItem("zipCode") as HTMLInputElement).value,
      height: (formElements.namedItem("height") as HTMLInputElement).value,
      weight: (formElements.namedItem("weight") as HTMLInputElement).value,
    };

    try {
      await updateProfile(user, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      await setDoc(doc(db, "users", user.uid), {
        address: {
          city: data.city,
          street: data.street,
          zipCode: data.zipCode,
        },
        height: Number(data.height) || null,
        weight: Number(data.weight) || null,
      });

      setSuccess("Profil zaktualizowany pomyślnie!");
    } catch (e: unknown) {
      console.error("Error adding document: ", e);
      setError("Błąd aktualizacji profilu. Możliwy brak uprawnień.");
    }
  };

  return {
    error,
    success,
    profileData,
    isLoading,
    handleProfileChange,
    onSubmit,
  };
};
