"use client";

import Button from "@/app/_components/Button";
import InputField from "@/app/_components/InputField";
import InputSelect from "@/app/_components/InputSelect";
import RichTextEditor from "@/app/_components/RichTextEditor";
import { useRef, useState } from "react";
import { addBlog, editBlog } from "../_lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { blogSchema } from "../_lib/validators";

function AddBlogForm({
  categories,
  currentUser,
  isEdit = false,
  defaultBlog,
  defaultCategory,
}) {
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
      categoryId: isEdit
        ? defaultCategory.id
        : categories?.find((c) => c.key === "all")?.id || "",
      title: isEdit ? defaultBlog.title || "" : "",
      content: isEdit
        ? JSON.stringify(defaultBlog.content)
        : JSON.stringify({ ops: [] }),
      image: null,
    },
  });

  const [category, setCategory] = useState(
    isEdit ? defaultCategory.key : "all"
  );

  function onEditorChange(delta) {
    const jsonString = JSON.stringify(delta);
    setValue("content", jsonString, { shouldValidate: true });
  }

  async function onSubmit(data) {
    const formData = new FormData();
    formData.set("authorId", data.authorId);
    formData.set("categoryId", data.categoryId);
    formData.set("title", data.title);
    formData.set("image", data.image ?? null);
    formData.set("content", JSON.stringify(data.content));

    let result;

    if (isEdit) {
      result = await editBlog(formData, defaultBlog.id, defaultBlog.image);
    }

    if (!isEdit) {
      result = await addBlog(formData);
    }

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
      <div className="flex gap-4 items-stretch">
        <div className="w-1/2">
          <InputField
            id="title"
            label="Title*"
            placeholder="Enter a compelling blog title..."
            error={errors.title?.message}
            defaultValue={isEdit ? defaultBlog?.title : ""}
            {...register("title")}
          />
        </div>

        <div className="mt-4.5">
          <InputSelect
            label="Category"
            id="category"
            options={categories}
            onChange={(val) => {
              setCategory(val);
              const selected = categories.find((c) => c.key === val);
              setValue("categoryId", selected?.id || "");
            }}
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
        initialValue={isEdit && defaultBlog.content}
      />

      <Button additionalClasses="ml-auto" type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? isEdit
            ? "Updating..."
            : "Publishing..."
          : isEdit
          ? "Update Blog"
          : "Publish Blog"}
      </Button>
    </form>
  );
}

export default AddBlogForm;
