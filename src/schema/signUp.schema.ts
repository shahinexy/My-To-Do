import { z } from "zod";

const nameRegex = /^[A-Za-z]+$/;

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(nameRegex, "First name must contain only letters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(nameRegex, "Last name must contain only letters"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters"),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
  password: z.string().nonempty("Password is required"),
  remember: z.boolean().optional(),
});