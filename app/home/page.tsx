"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/components/Header";
import TrainingGrafic from "@/app/components/TrainingGrafic/TrainigGrafic";


export default function HomePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/user/signin');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header ifLoged={true}/>
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <TrainingGrafic/>
            </main>
        </>
    );
}
