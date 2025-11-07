import z from "zod";

export const commentSchema = z.object({
  blogId: z.coerce.number().int().positive("Invalid blog ID"),
  userId: z.coerce.number().int().positive("Invalid user ID"),
  content: z
    .string()
    .min(5, "Comment must be at least 5 characters")
    .max(1000, "Comment cannot exceed 1000 characters"),
  parentCommentId: z.coerce
    .number()
    .int()
    .positive("Invalid parent comment ID")
    .nullable()
    .optional(),
});
