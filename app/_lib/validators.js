import z from "zod";

export const commentSchema = z.object({
  blogId: z.coerce.number().int().positive("Invalid blog ID"),
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

export const blogSchema = z.object({
  categoryId: z.coerce.number().int().positive("Invalid category ID"),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  image: z
    .any()
    .transform((val) => {
      // val can be: FileList, File, undefined, null, or empty FileList
      if (!val) return null;
      if (val instanceof File) return val;
      if (val && typeof val === "object" && "length" in val && val.length > 0) {
        return val[0];
      }
      return null;
    })
    .pipe(
      z
        .instanceof(File, { message: "Please upload a valid image file" })
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
          { message: "Only JPG, PNG or WebP images are allowed" },
        )
        .refine((file) => file.size <= 2 * 1024 * 1024, {
          message: "Image must be smaller than 2MB",
        })
        .nullable()
        .optional(),
    ),
  content: z.refine((delta) => {
    const text = delta.ops
      .map((op) => (typeof op.insert === "string" ? op.insert : ""))
      .join("");
    return text.trim().length >= 50;
  }, "Content must be at least 50 characters"),
});

export const editProfileSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name must be at most 100 characters"),
  bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
  avatar: z
    .instanceof(Blob)
    .optional() // Allows null or undefined (will treat undefined as null-ish)
    .nullable() // Explicitly allows null
    .refine((blob) => blob === null || blob.size <= 2 * 1024 * 1024, {
      message: "Avatar image must be smaller than 2MB",
    })
    .refine((blob) => blob === null || blob.type.startsWith("image/"), {
      message: "Avatar must be a valid image file",
    }),
});
