function InputField({
  id,
  label,
  placeholder,
  type = "text",
  defaultValue = "",
  disabled = false,
  onChange,
  accept,
}) {
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
        defaultValue={defaultValue}
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
}

export default InputField;
