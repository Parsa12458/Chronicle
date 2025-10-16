"use client";

import Button from "@/app/_components/Button";
import InputField from "@/app/_components/InputField";
import InputSelect from "@/app/_components/InputSelect";
import RichTextEditor from "@/app/_components/RichTextEditor";
import { useRef, useState } from "react";

const categories = {
  all: "All Categories",
  personal: "Personal Stories",
  lifestyle: "Lifestyle",
  health: "Health & Wellness",
  travel: "Travel",
  food: "Food & Recipes",
  relationships: "Relationships",
  education: "Education",
  career: "Career & Work",
  finance: "Finance & Budgeting",
  parenting: "Parenting",
  entertainment: "Entertainment",
  tech: "Technology",
  fashion: "Fashion & Style",
  art: "Art & Design",
  photography: "Photography",
  music: "Music",
  books: "Books & Literature",
  spirituality: "Spirituality",
  opinion: "Opinions & Commentary",
  humor: "Humor & Satire",
  culture: "Culture & Society",
  history: "History",
  sports: "Sports",
  news: "Current Events",
  activism: "Activism & Causes",
};

function AddBlogForm() {
  const editorRef = useRef();
  const [category, setCategory] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    const contentDelta = editorRef.current?.getContent();
    console.log(contentDelta, category);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex gap-4 items-stretch">
        <div className="w-1/2">
          <InputField
            id="title"
            label="Title*"
            placeholder="Enter a compelling blog title..."
            type="text"
          />
        </div>
        <div className="mt-4.5">
          <InputSelect
            label="category"
            id="category"
            options={categories}
            onChange={setCategory}
          />
        </div>
        <InputField
          id="image"
          label="Featured Image"
          type="file"
          accept="image/*"
        />
      </div>
      <RichTextEditor ref={editorRef} />

      <Button additionalClasses="ml-auto" type="submit">
        Publish Blog
      </Button>
    </form>
  );
}

export default AddBlogForm;
