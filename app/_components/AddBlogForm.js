"use client";

import Button from "@/app/_components/Button";
import InputField from "@/app/_components/InputField";
import InputSelect from "@/app/_components/InputSelect";
import RichTextEditor from "@/app/_components/RichTextEditor";
import { useRef, useState } from "react";
import { addBlog } from "../_lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { blogSchema } from "../_lib/validators";

function AddBlogForm({ categories, currentUser }) {
  const router = useRouter();
  const editorRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      authorId: currentUser.id,
      categoryId: categories?.find((c) => c.key === "all")?.id || "",
      title: "",
      content: JSON.stringify({ ops: [] }),
      image: undefined,
    },
  });

  const [category, setCategory] = useState("all");
  const selectedCategory = categories?.find((c) => c.key === category);

  function onEditorChange(delta) {
    const jsonString = JSON.stringify(delta);
    setValue("content", jsonString, { shouldValidate: true });
  }

  async function onSubmit(data) {
    const formData = new FormData();
    formData.set("authorId", String(currentUser.id));
    formData.set(
      "categoryId",
      String(selectedCategory?.id || categories[0]?.id)
    );
    formData.set("title", data.title);
    formData.set("image", data.image ?? null);
    formData.set("content", JSON.stringify(data.content));

    const result = await addBlog(formData);

    if (result.errorType === "validation") {
      Object.entries(result.errors).forEach(([field, err]) => {
        toast.error(`${field}: ${err.message}`);
      });
      return;
    }

    if (result.errorType === "server") {
      toast.error(result.error.message || "Something went wrong!");
      return;
    }

    toast.success("Your post is successfully published!");
    router.push(`/users/${currentUser.id}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <input type="hidden" {...register("authorId")} />
      <input
        type="hidden"
        {...register("categoryId")}
        value={
          selectedCategory?.id || categories?.find((c) => c.key === "all")?.id
        }
      />

      <div className="flex gap-4 items-stretch">
        <div className="w-1/2">
          <InputField
            id="title"
            label="Title*"
            placeholder="Enter a compelling blog title..."
            error={errors.title?.message}
            {...register("title")}
          />
        </div>

        <div className="mt-4.5">
          <InputSelect
            label="Category"
            id="category"
            options={categories}
            onChange={setCategory}
            value={category}
          />
        </div>

        <InputField
          id="image"
          label="Featured Image"
          type="file"
          accept="image/*"
          error={errors.image?.message}
          {...register("image")}
        />
      </div>

      <RichTextEditor
        ref={editorRef}
        error={errors.content?.message}
        onChange={onEditorChange}
      />

      <Button additionalClasses="ml-auto" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Publishing..." : "Publish Blog"}
      </Button>
    </form>
  );
}

export default AddBlogForm;
