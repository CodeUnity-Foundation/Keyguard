type PasswordResetLink = {
  name: string;
  email: string;
  resetLink: string;
  expire: number;
};

// change password, master password, forgot password, master password.
export const PasswordResetLink = ({ name, email, resetLink, expire }: PasswordResetLink) => {
  return (
    <div>
      <h2>Hello {name}</h2>
      <p>
        This email is just want to inform you that {email} account has been requested to reset the password.
      </p>
      <p>
        Here is the reset link
        <a href={`${resetLink}`}>Reset Link</a>
      </p>
      <p>This link will expire in {expire} minitues.</p>
    </div>
  );
};
