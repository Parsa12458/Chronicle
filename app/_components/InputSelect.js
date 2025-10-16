"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

function InputSelect({
  label,
  id,
  options,
  paramEnabled = false,
  defaultValue = "",
  onChange,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValue = paramEnabled
    ? searchParams.get(id) || defaultValue
    : defaultValue;

  const [selected, setSelected] = useState(initialValue);

  useEffect(() => {
    if (paramEnabled) {
      const paramValue = searchParams.get(id);
      if (paramValue !== selected) {
        setSelected(paramValue || defaultValue);
      }
    }
  }, [searchParams, paramEnabled, id, defaultValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onChange?.(value);

    if (paramEnabled) {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(id, value);
      } else {
        params.delete(id);
      }
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-0.5 text-sm font-semibold w-max">
      <label
        htmlFor={id}
        className="absolute bottom-9 text-xs font-normal uppercase tracking-wider"
      >
        {label}
      </label>
      <select
        name={id}
        id={id}
        value={selected}
        onChange={handleChange}
        className="rounded border border-mediumGreen bg-transparent px-4 py-1.5 text-sm font-medium outline-none appearance-none min-w-36"
      >
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key} className="bg-background">
            {label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 -right-2.5 flex w-9 items-center">
        <IoIosArrowDown className="fill-mediumGreen" />
      </div>
    </div>
  );
}

export default InputSelect;
