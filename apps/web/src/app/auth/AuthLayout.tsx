import Image, { StaticImageData } from 'next/image';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  authPageImage: string;
  logo: StaticImageData;
  form: React.ReactNode;
}

export default function AuthLayout({ authPageImage, logo, subtitle, title, form }: AuthLayoutProps) {
  return (
    <main className="w-full h-screen flex items-center justify-center flex-col md:flex-row">
      <div className="flex-1 h-full bg-secondary rounded-r-3xl hidden md:block">
        <div className="flex flex-col w-full h-full justify-center items-center">
          <Image src={logo} alt="VaultMaster-logo" width={50} height={50} className="absolute top-10 left-10" />
          <Image src={authPageImage} alt="VaultMaster" width={550} height={550} />
        </div>
      </div>
      <div className="flex-1 h-full flex items-center justify-center">
        <div className="flex flex-col lg:w-[60%] md:w-3/4 w-[350px] h-full justify-center">
          <div className="mb-5">
            <h1 className="font-medium lg:text-2xl text-xl">{title}</h1>
            <p className="text-muted-300 lg:text-lg text-base font-medium">{subtitle}</p>
          </div>
          {form}
          <footer className="text-center text-muted-500 dark:text-muted-200 font-medium mt-10 text-sm">
            Powered by <span className="text-primary">CodeUnity Foundation</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
