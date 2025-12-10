"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/components/Header";
import TrainingGrafic from "@/app/components/TrainingGrafic/TrainigGrafic";
import Image from "next/image"

export default function HomePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/user/signin');
        }
    }, [user, loading, router]);

    useEffect(() => {
        document.body.style.background = "radial-gradient(circle, #0D4F5F, #181510)";
        return () => {
            document.body.style.background = "";
        };
    }, []);

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}> 
            <Header />
            <main className="flex flex-1 flex-col items-center justify-start p-24">
                    <Image src="/images/lifting.png" alt="" width={1500} height={1000} className="absolute z-[-1]"/>
                <TrainingGrafic/>
            </main>
        </div>
        </>
    );
}
