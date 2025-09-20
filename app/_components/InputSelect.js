"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

function InputSelect({ label, id, options }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(id, value);
    } else {
      params.delete(id);
    }

    router.push(`?${params.toString()}`);
  };

  const currentValue = searchParams.get(id) || "";

  return (
    <div className="relative flex flex-col items-center justify-center gap-0.5 text-sm font-semibold">
      <label
        htmlFor={id}
        className="absolute bottom-9 text-xs font-normal uppercase tracking-wider"
      >
        {label}
      </label>
      <select
        name={id}
        id={id}
        value={currentValue}
        onChange={handleChange}
        className="rounded border border-mediumGreen bg-transparent px-4 py-1.5 text-sm font-medium outline-none appearance-none min-w-36"
      >
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key} className="bg-background ">
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
