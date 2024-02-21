import Image, { StaticImageData } from "next/image";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  authPageImage: string;
  logo: StaticImageData;
  form: React.ReactNode;
}

export default function AuthLayout({ authPageImage, logo, subtitle, title, form }: AuthLayoutProps) {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center md:flex-row">
      <div className="bg-secondary hidden h-full flex-1 rounded-r-3xl md:block">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Image
            src={logo}
            alt="VaultMaster-logo"
            width={50}
            height={50}
            className="absolute left-10 top-10"
          />
          <Image src={authPageImage} alt="VaultMaster" width={550} height={550} />
        </div>
      </div>
      <div className="flex h-full flex-1 items-center justify-center">
        <div className="flex h-full w-[350px] flex-col justify-center md:w-3/4 lg:w-[60%]">
          <div className="mb-5">
            <h1 className="text-xl font-medium lg:text-2xl">{title}</h1>
            <p className="text-muted-300 text-base font-medium lg:text-lg">{subtitle}</p>
          </div>
          {form}
          <footer className="text-muted-500 dark:text-muted-200 mt-10 text-center text-sm font-medium">
            Powered by <span className="text-primary">CodeUnity Foundation</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
