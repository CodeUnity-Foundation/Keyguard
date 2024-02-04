type AccountLoginSuccessProps = {
  name: string;
  email: string;
  ip: string | string[];
  time: string;
  browser: string;
};

export const AccountLoginSuccess = ({ name, email, ip, time, browser }: AccountLoginSuccessProps) => {
  return (
    <div>
      <h2>Hello {name}</h2>
      <p>
        Your account {email} was logged in from the ip: {ip} at {time}. The browser used was {browser}.
      </p>
    </div>
  );
};
