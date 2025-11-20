import InputField from "@/app/components/InputField";
import Link from "next/link";
import ButtonBlack from "@/app/components/ButtonBlack";


export default function RegisterForm() {
    return (
        <>
        <div style={{backgroundColor: "rgba(245, 255, 234, 0.1)", boxShadow: "inset 0 8px 16px 0 rgba(128, 255, 0, 0.2)"}} className="w-[360px] h-[460px] rounded-[20px] p-[20px] backdrop-blur-[20px]">
            <form className="h-full flex flex-col justify-center items-center">
                <div className="text-[20px] [font-family:var(--font-manropeSemiBold)] mb-[20px]"> Zarejestruj się</div>
            <div className="">
                <InputField label="Username" placeholder="Username"/>
            </div>

            <div className="mt-[20px]">
                <InputField label="Password" placeholder="Password"/>
            </div>

            <div className="mt-[20px] flex items-center justify-center">
                <ButtonBlack nameButton="Register"/>
            </div>
            <div className="mt-[50px] flex items-center justify-center flex-col gap-y-[10px]">
                <div className="text-[16px] [font-family:var(--font-manrope)]">Masz juz konto?</div>
                <Link href="/user/signin" className="text-[#80FF00] text-[16px] [font-family:var(--font-manropeSemiBold)]">Zaloguj się</Link>
            </div>
        </form>
        </div>
        </>
    )
}
