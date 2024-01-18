type OTPVerification = {
  name: string;
  otp: string;
  expire: string;
};

export const OTPVerification = ({ name, otp, expire }: OTPVerification) => {
  return (
    <div>
      <h2>Hello {name}</h2>
      <p>Your verification otp is {otp}</p>
      <p>It will expire after {expire}</p>
    </div>
  );
};
