type OTPVerification = {
  name: string;
  otp: string;
};

export const OTPVerification = ({ name, otp }: OTPVerification) => {
  return (
    <div>
      <h2>Hello {name}</h2>
      <p>Your verification otp is {otp}</p>
    </div>
  );
};
