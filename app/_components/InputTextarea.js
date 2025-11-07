import { forwardRef } from "react";

const InputTextarea = forwardRef(function InputTextarea(
  { id, placeholder, row = 3, autoFocus, label, error, ...rest },
  ref
) {
  return label ? (
    <div className="flex flex-col text-left">
      <label htmlFor={id} className="mb-0.5 text-xs font-semibold">
        {label}
      </label>
      <textarea
        name={id}
        id={id}
        className={`block ${
          error ? "border-red-700" : "border-mediumGreen"
        } border rounded px-3 py-2 text-sm font-medium placeholder:text-mediumGreen/60 autofill:bg-background focus:outline-0 w-full`}
        placeholder={placeholder}
        rows={row}
        autoFocus={autoFocus}
        required={required}
        ref={ref}
        {...rest}
      ></textarea>
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  ) : (
    <>
      <textarea
        name={id}
        id={id}
        className={`block ${
          error ? "border-red-700" : "border-mediumGreen"
        } border rounded px-3 py-2 text-sm font-medium placeholder:text-mediumGreen/60 autofill:bg-background focus:outline-0 w-full`}
        placeholder={placeholder}
        rows={row}
        autoFocus={autoFocus}
        ref={ref}
        {...rest}
      ></textarea>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </>
  );
});

export default InputTextarea;
