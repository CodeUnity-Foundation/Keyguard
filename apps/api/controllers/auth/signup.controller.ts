import { IUser, User, comparePassword, sanatizedUser, userExisted } from "@keyguard/database";
import { SignupSchemaType } from "@keyguard/database/zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

import { Response } from "../../constants";
import { generateJWT } from "../../utils/generateJWT";

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

  const user = await User.create({
    ...input,
    password: hashedPassword,
    master_password: null,
    deleted_at: null,
  });

  // return the user
  const userResponse = (await sanatizedUser({ email: user.email })) as IUser;

  if (!userResponse) {
    throw new TRPCError({ code: "NOT_FOUND", message: Response.USER_NOT_FOUND });
  }

  const token = generateJWT({
    payload: { userId: userResponse._id, email: userResponse.email },
    secret: process.env.JWT_SECRET!,
    duration: process.env.JWT_EXPIRES_IN!,
  });

  const refreshToken = generateJWT({
    payload: { userId: user._id, email: user.email },
    secret: process.env.REFRESH_TOKEN_SECRET!,
    duration: process.env.REFRESH_TOKEN_EXPIRES_IN!,
  });

  // case should handle, if the query fails
  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        refresh_token: refreshToken,
      },
    }
  );

  const userData = { user: userResponse, token };

  return {
    status: 200,
    success: true,
    message: "Account created successfully. Check your email for OTP verification!",
    ...userData,
  };
};
