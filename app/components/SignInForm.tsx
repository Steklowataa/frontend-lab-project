"use client"
import ButtonGradient from "@/app/components/ButtonGradient";
import Link from "next/link";
import InputField from "@/app/components/InputField";
import { FormEvent } from "react";

export default function SignInForm({ onSubmit }: {onSubmit: (e: FormEvent<HTMLFormElement>) => void}) {
    return (
        <>
        <div style={{backgroundColor: "rgba(245, 255, 234, 0.1)", boxShadow: "inset 0 8px 16px 0 rgba(128, 255, 0, 0.2)"}} className="w-[360px] h-[460px] rounded-[20px] p-[20px] backdrop-blur-[20px]">
            <form onSubmit={onSubmit} className="h-full flex flex-col justify-center items-center">
                <div className="text-[20px] [font-family:var(--font-manropeSemiBold)] mb-[20px]"> Zaloguj się</div>
            <div className="w-full max-w-[280px]">
                <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    required
                />
            </div>

            <div className="mt-[20px] w-full max-w-[280px]">
                <InputField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    required
                />
                <div className="flex items-end justify-end mt-[10px]">
                    <a href="#" style={{color: "#D9D9D9"}} className="text-[14px] [font-family:var(--font-manrope)]">Forget Password?</a>
                </div>
            </div>

            <div className="mt-[20px] flex items-center justify-center">
                <ButtonGradient 
                    type="submit"
                    nameButton="Sign In"/>
            </div>
            <div className="mt-[50px] flex items-center justify-center flex-col gap-y-[10px]">
                <div className="text-[16px] [font-family:var(--font-manrope)]">Nie masz jeszcze konta?</div>
                <Link href="/user/register" className="text-[#80FF00] text-[16px] [font-family:var(--font-manropeSemiBold)]">Zarejestruj się</Link>
            </div>
        </form>
        </div>
        </>
    )
}
