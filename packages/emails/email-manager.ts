import { FROM_EMAIL } from "./config";
import mailSender from "./mailSender";
import renderEmail from "./src/renderEmail";
import { ActionType } from "./src/templates/PasswordConfirmation";

interface OTPVerificationEvent {
  name: string;
  email: string;
  otp: string;
  expire: string;
}

export const sendOTPVarificationEmail = async (otpVerificationEvent: OTPVerificationEvent) => {
  const mailerPayload = {
    from: FROM_EMAIL ?? "",
    to: otpVerificationEvent.email,
    subject: "Email verification with OTP!",
    html: renderEmail("OTPVerification", {
      name: otpVerificationEvent.name,
      otp: otpVerificationEvent.otp,
      expire: otpVerificationEvent.expire,
    }),
    responseMessage: "OTP sent successfully!",
  };
  return await mailSender(mailerPayload);
};

interface PasswordConfirmationEvent {
  name: string;
  email: string;
  type: ActionType;
}

export const sendPasswordConfirmationEmail = async (passwordConfirmationEvent: PasswordConfirmationEvent) => {
  const mailerPayload = {
    from: FROM_EMAIL ?? "",
    to: passwordConfirmationEvent.email,
    subject: "Password confirmation!",
    html: renderEmail("PasswordConfirmation", {
      name: passwordConfirmationEvent.name,
      type: passwordConfirmationEvent.type,
    }),
    responseMessage: "Password confirmation email sent successfully!",
  };
  return await mailSender(mailerPayload);
};

interface AccountLoginSuccessEvent {
  name: string;
  email: string;
  ip: string | string[];
  time: string;
  browser: string;
}

export const sendAccountLoginSuccessEmail = async (accountLoginSuccessEvent: AccountLoginSuccessEvent) => {
  const mailerPayload = {
    from: FROM_EMAIL ?? "",
    to: accountLoginSuccessEvent.email,
    subject: "Account login success!",
    html: renderEmail("AccountLoginSuccess", {
      name: accountLoginSuccessEvent.name,
      email: accountLoginSuccessEvent.email,
      ip: accountLoginSuccessEvent.ip,
      browser: accountLoginSuccessEvent.browser,
      time: accountLoginSuccessEvent.time,
    }),
    responseMessage: "Account login success email sent successfully!",
  };
  return await mailSender(mailerPayload);
};

interface ResetPasswordLinkEvent {
  name: string;
  email: string;
  resetLink: string;
  expire: number;
}

export const sendPasswordResetLink = async (passwordResetLinkEvent: ResetPasswordLinkEvent) => {
  const mailerPayload = {
    from: FROM_EMAIL ?? "",
    to: passwordResetLinkEvent.email,
    subject: "Password reset!",
    html: renderEmail("PasswordResetLink", {
      name: passwordResetLinkEvent.name,
      email: passwordResetLinkEvent.email,
      resetLink: passwordResetLinkEvent.resetLink,
      expire: passwordResetLinkEvent.expire,
    }),
    responseMessage: "Password reset link sent successfully!",
  };
  return await mailSender(mailerPayload);
};
