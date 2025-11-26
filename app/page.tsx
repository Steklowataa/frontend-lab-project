"use client";

import Link from 'next/link';
import Header from '@/app/components/Header';
import { useAuth } from './lib/AuthContext';
import LogoutButton from './components/LogoutButton';
import { useState, useEffect } from 'react';



export default function Home() {
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Strona Główna</h1>
        <p>Witaj w głównej części aplikacji.</p>
        <p>Ta zawartość jest renderowana przez `app/page.tsx` i umieszczona wewnątrz `RootLayout`.</p>
      </div>
      <div className="mt-8 flex gap-4">
        {!isClient || loading ? (
          <div>Loading...</div>
        ) : user ? (
          <LogoutButton />
        ) : (
          <>
            <Link href="/user/signin" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Logowanie
            </Link>
            <Link href="/user/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Rejestracja
            </Link>
          </>
        )}
      </div>
    </main>
    </>

  );
}
