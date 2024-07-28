import z from "zod";

export const stringValidation = (message?: string) => {
  return z
    .string()
    .trim()
    .nonempty({ message: message || "Field is required" });
};

export const passwordValidation = (message?: string) => {
  return stringValidation(message)
    .min(6, { message: "Minimum 6 characters required" })
    .max(25, { message: "Maximum 25 characters required" });
};

export const booleanValidation = () => {
  return z.boolean().default(false);
};
