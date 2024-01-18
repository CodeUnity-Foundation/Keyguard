type PswdConfirmation = {
  name: string;
};

export const PasswordConfirmation = ({ name }: PswdConfirmation) => {
  return (
    <div>
      <h2>Hello {name}</h2>
      <p>This email is just to inform you that you have set or update your master-password.</p>
    </div>
  );
};
