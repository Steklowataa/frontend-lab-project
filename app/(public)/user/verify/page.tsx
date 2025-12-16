"use client";

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/lib/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { useSearchParams } from 'next/navigation';

const VerifyContent = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const fromSignin = searchParams.get('from') === 'signin';
  const emailFromQuery = searchParams.get('email');
  
  useEffect(() => {
    if (fromSignin) {
      setEmail(emailFromQuery);
    } else {
      const auth = getAuth();
      if (user) {
        setEmail(user.email);
        signOut(auth);
      }
    }
  }, [user, fromSignin, emailFromQuery]);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {fromSignin ? (
        <>
          <h2 className="text-3xl font-bold mb-4">Weryfikacja adresu email</h2>
          <p className="mb-8 text-center">
            Twój adres email nie jest zweryfikowany. <br />
            Wysłaliśmy nowy link weryfikacyjny na Twój adres email {email && <strong>{email}</strong>}.<br />Proszę sprawdzić swoją skrzynkę pocztową.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4">Rejestracja zakończona pomyślnie!</h2>
          <p className="mb-8 text-center">
            Na Twój adres email {email && <strong>{email}</strong>} została wysłana wiadomość z linkiem weryfikacyjnym.<br />Proszę sprawdzić swoją skrzynkę pocztową.
          </p>
        </>
      )}
      <Link href="/user/signin" style={{color: "#80FF00"}} className="text-white text-[18px] font-bold py-2 px-4 rounded">
        Przejdź do logowania
      </Link>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
