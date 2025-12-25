"use client";

import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import "quill/dist/quill.snow.css";

const options = {
  theme: "snow",
  modules: {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [
        { color: [] },
        {
          background: [
            "#ecf3ed",
            "#FF6F61",
            "#FFB347",
            "#FDD835",
            "#81C784",
            "#64B5F6",
            "#4DB6AC",
            "#BA68C8",
            "#FF94C2",
            "#998279",
            "#cacaca",
            "#D4E157",
            "#4DD0E1",
            "#F06292",
            "#646464",
            "#ffc0a8",
            "#2f7c7c",
          ],
        },
      ],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["clean"],
    ],
  },
};

const RichTextEditor = forwardRef(({ error, onChange, initialValue }, ref) => {
  const textEditorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    import("quill").then(({ default: Quill }) => {
      if (!textEditorRef.current || quillInstance.current) return;

      const quill = new Quill(textEditorRef.current, options);
      quillInstance.current = quill;

      if (initialValue) {
        quill.setContents(initialValue);
      }

      quill.on("text-change", () => {
        const delta = quill.getContents();
        onChange?.(delta);
      });
    });
  }, [onChange, initialValue]);

  useImperativeHandle(ref, () => ({
    getContent: () => quillInstance.current?.getContents() || null,
    getHTML: () => quillInstance.current?.root.innerHTML || "",
  }));

  return (
    <div>
      <div ref={textEditorRef} />
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  );
});

export default RichTextEditor;
