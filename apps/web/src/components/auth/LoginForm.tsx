"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType, SignupSchemaType, loginSchema } from "@keyguard/database/zod";
import { encrypt } from "@keyguard/lib";
import { Button, Checkbox, Input, Label, Loader } from "@keyguard/ui";
import { LOCAL_STORAGE_ENC_DEC_SECRET } from "@keyguard/web/utils/envvariables";
import { storeJSON } from "@keyguard/web/utils/localstorage";
import { trpc } from "@keyguard/web/utils/trpc";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcInfo } from "react-icons/fc";

const defaultValues: LoginSchemaType = {
  email: "rajpatel@gmail.com",
  password: "123456",
  is_remember: false,
};

type SignedUserType = Pick<SignupSchemaType, "name" | "email">;

export default function LoginForm() {
  const router = useRouter();

  const { register, handleSubmit, formState, watch, setValue } = useForm<LoginSchemaType>({
    defaultValues,
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const { errors, isDirty, isValid } = formState;

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess(data) {
      const signedUser: SignedUserType = {
        name: data?.user?.name,
        email: data?.user?.email,
      };
      const encryptedData = encrypt<SignedUserType>(signedUser, LOCAL_STORAGE_ENC_DEC_SECRET);
      storeJSON("$stored_person_properties", encryptedData);
      setCookie("keyguard_auth_token", data.token);

      if (data.status === 200 && data.success) {
        toast.success(data?.message);
        router.push("/auth/login-master");
      } else {
        toast(data.message, { icon: <FcInfo /> });
        router.push("/auth/verify-otp");
      }
    },
    onError(error) {
      toast.error(error?.message);
    },
  });

  const onLoginSubmit = (data: LoginSchemaType) => {
    loginMutation.mutate(data);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onLoginSubmit)}>
      <Input
        id="email"
        type="email"
        label="Email"
        {...register("email")}
        placeholder="johndoe@gmail.com"
        error={errors?.email?.message}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="******"
        {...register("password")}
        error={errors?.password?.message}
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_remember"
          checked={watch("is_remember")}
          onCheckedChange={(e: boolean) => {
            setValue("is_remember", e);
          }}
        />
        <Label htmlFor="is_remember" className="my-2">
          Remember Me
        </Label>
      </div>

      <div className="my-2 flex items-center justify-between">
        <p className="text-xs font-medium text-black lg:text-sm dark:text-white">
          Don't' have an account?
          <Link href="/auth/signup" className="text-primary ml-1 font-semibold">
            Sign Up
          </Link>
        </p>
        <Link href="#" className="text-primary text-xs font-semibold lg:text-sm">
          Forgot password?
        </Link>
      </div>

      <Button className="mt-2" size={"lg"} disabled={loginMutation.isLoading || isDirty || !isValid}>
        {loginMutation.isLoading ? <Loader variant={"secondary"} size={"sm"} /> : "Next"}
      </Button>
    </form>
  );
}
