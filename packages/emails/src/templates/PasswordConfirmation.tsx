export type ActionType = "update_password" | "create_master_password" | "update_master_password";

type PasswordConfirmationProps = {
  name: string;
  type: ActionType;
};

// create master password, after update password or master password(in all case of reset link action).
export const PasswordConfirmation = ({ name, type }: PasswordConfirmationProps) => {
  const action = {
    update_password:
      "Your account password has been successfully updated. This password is used for logging into your account securely. Please keep it safe and do not share it with anyone.",
    create_master_password:
      "Your master password has been set up. This password grants access to your vault, ensuring the security of your sensitive information.",
    update_master_password:
      "Your master password has been updated. This password grants access to your vault, ensuring the security of your sensitive information.",
  };

  return (
    <div>
      <h2>Hello {name}</h2>
      <br />
      <p>{action[type]}</p>
      <p>Thank you for choosing us!</p>
      <p>VaultMaster | CodeUnity Foundation</p>
    </div>
  );
};
