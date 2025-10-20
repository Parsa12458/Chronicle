"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function InputField({
  id,
  label,
  placeholder,
  type = "text",
  defaultValue = "",
  disabled = false,
  onChange,
  accept,
  paramEnabled = false,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(
    paramEnabled ? searchParams.get(id) || defaultValue : defaultValue
  );

  useEffect(() => {
    if (!paramEnabled) return;

    const debounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set(id, value.trim());
      } else {
        params.delete(id);
      }
      router.push(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(debounce);
  }, [value, paramEnabled]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(e);
  };

  return (
    <div className="flex flex-col text-left">
      {label && (
        <label htmlFor={id} className="mb-0.5 text-xs font-semibold">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="rounded border border-mediumGreen bg-transparent px-3 py-1.5 text-sm font-medium placeholder:text-mediumGreen/60 autofill:bg-background focus:outline-0"
        disabled={disabled}
        value={value}
        onChange={handleChange}
        accept={accept}
      />
    </div>
  );
}

export default InputField;
