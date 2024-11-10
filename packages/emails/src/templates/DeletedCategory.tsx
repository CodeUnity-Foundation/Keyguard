type DeletedCategory = {
  name: string;
  email: string;
};

export const DeletedCategory = ({ name, email }: DeletedCategory) => {
  return (
    <div>
      <h2>Hello {name}</h2>
      <p>Alert! This email is to inform you that a category has been deleted from your vault.</p>
      <p>The email id for your vault is {email}</p>
    </div>
  );
};
