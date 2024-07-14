"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyMasterPasswordSchemaType, verifyMasterPasswordSchema } from "@keyguard/database/zod";
import { Button, Input, Loader } from "@keyguard/ui";
import { trpc } from "@keyguard/web/utils/trpc";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const defaultValues: VerifyMasterPasswordSchemaType = {
  master_password: "",
};

export default function LoginMasterForm() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<VerifyMasterPasswordSchemaType>({
    defaultValues,
    resolver: zodResolver(verifyMasterPasswordSchema),
    mode: "all",
  });

  const { errors, isDirty, isValid } = formState;

  const loginPasswordMutation = trpc.auth.verifyMasterPassword.useMutation({
    onSuccess(data) {
      if (data.status === 200 && data.success) {
        toast.success(data?.message);
        sessionStorage.setItem("access_token", data?.accessToken);
        router.push("/dashboard");
      }
    },
    onError(error) {
      toast.error(error?.message);
    },
  });

  const loginMasterPasswordSubmit = (data: VerifyMasterPasswordSchemaType) => {
    loginPasswordMutation.mutate(data);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(loginMasterPasswordSubmit)}>
      <Input
        id="password"
        type="password"
        label="Master Password"
        placeholder="******"
        {...register("master_password")}
        error={errors.master_password?.message}
      />

      <Button className="mt-2" size={"lg"} disabled={loginPasswordMutation.isLoading || !isDirty || !isValid}>
        {loginPasswordMutation.isLoading ? <Loader variant={"secondary"} size={"sm"} /> : "Access Vault"}
      </Button>
    </form>
  );
}
