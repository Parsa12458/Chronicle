function InputTextarea({
  id,
  placeholder,
  row = 3,
  autoFocus,
  label,
  required = false,
}) {
  return label ? (
    <div className="flex flex-col text-left">
      <label htmlFor={id} className="mb-0.5 text-xs font-semibold">
        {label}
      </label>
      <textarea
        name={id}
        id={id}
        className="block border-mediumGreen border rounded px-3 py-2 text-sm font-medium placeholder:text-mediumGreen/60 autofill:bg-background focus:outline-0 w-full"
        placeholder={placeholder}
        rows={row}
        autoFocus={autoFocus}
        required={required}
      ></textarea>
    </div>
  ) : (
    <textarea
      name={id}
      id={id}
      className="block border-mediumGreen border rounded px-3 py-2 text-sm font-medium placeholder:text-mediumGreen/60 autofill:bg-background focus:outline-0 w-full"
      placeholder={placeholder}
      rows={row}
      autoFocus={autoFocus}
      required={required}
    ></textarea>
  );
}

export default InputTextarea;
