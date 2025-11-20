import RegisterForm from "../../../components/RegisterForm";
import Image from "next/image";


export default function RegisterPage() {
  return (
    <>
    <Image src="/images/backgroundImg.jpg" alt="" width={1920} height={1080} style={{position: "absolute", zIndex: -1, filter: 'brightness(40%)'}}/>
     <main className="flex min-h-screen flex-col items-center justify-center">
       <RegisterForm />
    </main>
    </>

  );
}
