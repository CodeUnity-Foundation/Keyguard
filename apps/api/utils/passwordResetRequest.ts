import { sendPasswordResetLink } from '@repo/emails';
import { IUser } from '../models/types';

export const passwordResetRequest = async (user: IUser) => {
  const { _id } = user;

  // store the dateTime after 2 minitue
  const tokenExpiryTime = new Date();
  tokenExpiryTime.setMinutes(tokenExpiryTime.getMinutes() + 2);
  user.tokenExpiry = tokenExpiryTime;
  await user.save();

  // generate password reset link
  const passwordResetLink = `${process.env.NEXT_PUBLIC_WEBAPP_URL}/auth/forgot-password/${_id}`;

  const remainingMinitues = tokenExpiryTime.getMinutes() - new Date().getMinutes();

  // send password reset link to user
  const mailResponse = await sendPasswordResetLink({
    name: user.name,
    email: user.email,
    resetLink: passwordResetLink,
    expire: remainingMinitues,
  });

  return mailResponse;
};
