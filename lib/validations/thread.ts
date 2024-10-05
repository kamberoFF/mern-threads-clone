import * as z from 'zod';

export const threadValidation = z.object({
  thread: z.string().nonempty().min(3, {message: "Minimum 3 characters!"}).max(1600, {message: "Maximum 1600 characters!"}),
  accountId: z.string()
});

export const commentValidation = z.object({
    thread: z.string().nonempty().min(3, {message: "Minimum 3 characters!"}).max(1600, {message: "Maximum 1600 characters!"})
  });