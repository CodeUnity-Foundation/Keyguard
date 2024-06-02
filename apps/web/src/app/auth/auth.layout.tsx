import { Button } from "@keyguard/ui";
import authBG from "@keyguard/web/assets/auth-bg.webp";
import logo from "@keyguard/web/assets/keyguard.svg";
import { ThemeSwitcher } from "@keyguard/web/components/ThemeSwitcher";
import Image from "next/image";
import { FaCirclePlay } from "react-icons/fa6";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  form: React.ReactNode;
}

export default function AuthLayout({ subtitle, title, form }: AuthLayoutProps) {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center md:flex-row">
      <div className="absolute right-10 top-10 z-10">
        <ThemeSwitcher />
      </div>

      <div className="bg-primary hidden h-full flex-1 rounded-r-3xl md:block">
        <div className="relative h-[100vh] w-full">
          <Image
            src={authBG}
            alt="auth-bg"
            className="absolute inset-0 left-0 top-0 z-0 h-full w-full bg-cover bg-center opacity-20 blur-sm"
          />
        </div>
        <div className="z-10 flex w-full flex-col items-center justify-center">
          <Image
            src={logo}
            alt="Keyguard-logo"
            width={170}
            height={170}
            className="absolute left-10 top-10 z-10"
          />
          <div className="absolute inset-0 flex w-fit flex-col items-center justify-center">
            <div className="ml-[80px] w-[250px] lg:ml-[130px] lg:w-[320px]">
              <h1 className="text-5xl font-medium capitalize text-white lg:text-6xl">
                Secure your digital life
              </h1>
              <Button
                size={"lg"}
                variant={"secondary"}
                className="mt-10 h-max rounded-full bg-black px-4 py-4 text-white">
                <FaCirclePlay size={35} className="text-primary rounded-full bg-white" />
                <span className="ml-4 text-base lg:text-lg">Watch Demo</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full w-[80%] flex-1 items-center justify-center">
        <div className="flex h-full w-full flex-col justify-center md:w-3/4 lg:w-[60%]">
          <div className="mb-5">
            <h1 className="text-xl font-medium lg:text-2xl">{title}</h1>
            <p className="text-muted dark:text-muted-600 text-base font-normal lg:text-lg">{subtitle}</p>
          </div>
          {form}
          <footer className="text-muted dark:text-muted-600 mt-10 text-center text-sm font-medium">
            Powered by <span className="text-primary">CodeUnity Foundation</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
