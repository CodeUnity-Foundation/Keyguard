"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MasterPasswordSchemaType, createMasterPasswordSchema } from "@keyguard/database/zod";
import { Button, Input, Loader } from "@keyguard/ui";
import { trpc } from "@keyguard/web/utils/trpc";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const defaultValues: MasterPasswordSchemaType = {
  master_password: "",
  confirm_master_password: "",
};

export default function SetMasterForm() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<MasterPasswordSchemaType>({
    defaultValues,
    resolver: zodResolver(createMasterPasswordSchema),
    mode: "all",
  });

  const { errors, isDirty, isValid } = formState;

  const setPasswordMutation = trpc.auth.createMasterPassword.useMutation({
    onSuccess(data) {
      if (data.status === 200 && data.success) {
        toast.success(data?.message);
        // setting both local storage and cookies because, session is not accessible in middleware. So we are using cookies to store session, which is accessible in middleware.
        sessionStorage.setItem("access_token", data?.accessToken);
        setCookie("access_token", data?.accessToken);
        router.push("/dashboard");
      }
    },
    onError(error) {
      toast.error(error?.message);
    },
  });

  const onSetMasterPasswordSubmit = (data: MasterPasswordSchemaType) => {
    setPasswordMutation.mutate(data);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSetMasterPasswordSubmit)}>
      <Input
        id="master_password"
        type="password"
        label="Master Password"
        placeholder="******"
        {...register("master_password")}
        autoComplete="off"
        error={errors?.master_password?.message}
      />

      <Input
        id="confirm_master_password"
        type="password"
        label="Confirm Master Password"
        placeholder="******"
        {...register("confirm_master_password")}
        autoComplete="off"
        error={errors?.confirm_master_password?.message}
      />

      <Button className="mt-2" size={"lg"} disabled={setPasswordMutation.isLoading || !isDirty || !isValid}>
        {setPasswordMutation.isLoading ? <Loader variant={"secondary"} size={"sm"} /> : "Join now"}
      </Button>
    </form>
  );
}
