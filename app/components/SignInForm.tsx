import InputField from "@/app/components/InputField";
import ButtonGradient from "@/app/components/ButtonGradient";
import Link from "next/link";

export default function SignInForm() {
    return (
        <>
        <div style={{backgroundColor: "rgba(245, 255, 234, 0.1)", boxShadow: "inset 0 8px 16px 0 rgba(128, 255, 0, 0.2)"}} className="w-[360px] h-[460px] rounded-[20px] p-[20px] backdrop-blur-[20px]">
            <form className="h-full flex flex-col justify-center items-center">
                <div className="text-[20px] [font-family:var(--font-manropeSemiBold)] mb-[20px]"> Zaloguj się</div>
            <div className="">
                <InputField label="Username" placeholder="Username"/>
            </div>

            <div className="mt-[20px]">
                <InputField label="Password" placeholder="Password"/>
                <div className="flex items-end justify-end mt-[10px]">
                    <a href="#" style={{color: "#D9D9D9"}} className="text-[14px] [font-family:var(--font-manrope)]">Forget Password?</a>
                </div>
            </div>

            <div className="mt-[20px] flex items-center justify-center">
                <ButtonGradient nameButton="Sign In"/>
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
