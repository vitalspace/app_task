import { z } from "zod";
const MIN_LENGTH = 8;

export const formSchema = z.object({
  avatar: z.string().trim().url(),
  name: z
    .string()
    .trim()
    .min(MIN_LENGTH, {
      message: `Must be ${MIN_LENGTH} or more characters long`,
    }),
  username: z
    .string()
    .trim()
    .min(MIN_LENGTH, {
      message: `Must be ${MIN_LENGTH} or more characters long`,
    }),
  email: z.string().trim().email("Invalid email"),
});

export type FormSchema = z.infer<typeof formSchema>;
