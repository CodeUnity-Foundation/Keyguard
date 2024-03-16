"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchemaType, signupSchema } from "@keyguard/lib/validations";
import { Button, Input, Loader, useToast } from "@keyguard/ui";
import { storeJSON } from "@keyguard/web/utils/localstorage";
import { trpc } from "@keyguard/web/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiTwotoneMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { IoKeyOutline } from "react-icons/io5";

const defaultValues: SignupSchemaType = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

export default function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();

  const { register, handleSubmit, formState } = useForm<SignupSchemaType>({
    defaultValues,
    resolver: zodResolver(signupSchema),
    mode: "all",
  });

  const { errors, isDirty, isValid } = formState;

  const signupMutation = trpc.auth.signup.useMutation({
    onSuccess(data) {
      if (data.status === 200 && data.success) {
        toast({
          duration: 5000,
          variant: "success",
          description: data?.message,
        });
        const loggedInUser = {
          name: data?.user?.name,
          email: data?.user?.email,
        };
        storeJSON("$stored_person_properties", loggedInUser);
        router.push("/auth/verify-otp");
      }
    },
    onError(error) {
      toast({
        duration: 5000,
        variant: "error",
        description: error?.message,
      });
    },
  });

  const onSignupSubmit = (data: SignupSchemaType) => {
    const payload = { ...data, is_verified: false };
    signupMutation.mutate(payload);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSignupSubmit)}>
      <Input
        id="name"
        type="text"
        label="Name"
        {...register("name")}
        placeholder="John Doe"
        icon={<BsFillPersonFill />}
        error={errors?.name?.message}
      />

      <Input
        id="email"
        type="email"
        label="Email"
        {...register("email")}
        placeholder="johndoe@gmail.com"
        icon={<AiTwotoneMail />}
        error={errors?.email?.message}
      />

      <div className="flex items-start justify-center gap-3">
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="******"
          {...register("password")}
          icon={<IoKeyOutline />}
          error={errors?.password?.message}
        />

        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="******"
          {...register("confirm_password")}
          icon={<IoKeyOutline />}
          error={errors?.confirm_password?.message}
        />
      </div>

      <div className="my-2 flex items-center justify-between">
        <p className="text-muted-500 dark:text-muted-200 text-xs font-medium lg:text-sm">
          Already have an account?
          <Link href="#" className="text-primary ml-1 font-semibold">
            Login
          </Link>
        </p>
        <Link href="#" className="text-primary text-xs font-semibold lg:text-sm">
          Forgot password?
        </Link>
      </div>

      <Button className="mt-2" size={"lg"} disabled={signupMutation.isLoading || !isDirty || !isValid}>
        {signupMutation.isLoading ? <Loader variant={"secondary"} size={"sm"} /> : "Next"}
      </Button>
    </form>
  );
}
