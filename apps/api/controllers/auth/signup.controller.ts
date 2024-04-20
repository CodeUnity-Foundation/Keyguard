import { sendOTPVarificationEmail } from "@keyguard/emails";
import { addDateTime } from "@keyguard/lib";
import { IUser, User, comparePassword, sanatizedUser, userExisted } from "@keyguard/lib/server";
import { SignupSchemaType } from "@keyguard/lib/validations";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

import { Response, TWO } from "../../constants";
import { generateJWT } from "../../utils/generateJWT";
import { generateOTP } from "../../utils/generateOTP";

type SignUpProps = {
  input: SignupSchemaType;
};

/**
 *
 * TODO: Handle the profile image upload
 */
export const signupController = async ({ input }: SignUpProps) => {
  const existingUser = await userExisted({ email: input.email });

  if (existingUser) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.USER_ALREADY_EXISTS });
  }

  const { password, confirm_password } = input;

  comparePassword({ password, confirmPassword: confirm_password });

  const hashedPassword = await bcrypt.hash(input.password, 10);

  const otp = generateOTP();

  const user = await User.create({
    ...input,
    password: hashedPassword,
    master_password: null,
    emailVerification: {
      otp: +otp,
      otp_expiry: addDateTime(TWO, "minutes"),
    },
    deletedAt: null,
  });

  // send otp
  await sendOTPVarificationEmail({
    name: input.name,
    email: input.email,
    otp: otp,
    expire: "2 minutes",
  });

  // return the user
  const userResponse = (await sanatizedUser({ email: user.email })) as IUser;

  if (!userResponse) {
    throw new TRPCError({ code: "NOT_FOUND", message: Response.USER_NOT_FOUND });
  }

  const token = generateJWT({
    payload: { userId: userResponse._id, email: userResponse.email },
    duration: 7,
    durationUnit: "days",
  });

  const userData = { user: userResponse, token };

  return {
    status: 200,
    success: true,
    message: "Account created successfully. Check your email for OTP verification!",
    ...userData,
  };
};
