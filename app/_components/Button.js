import Link from "next/link";

const bgClassMap = {
  background: "bg-background",
  primary: "bg-primary",
  mediumGreen: "bg-mediumGreen",
  darkGreen: "bg-darkGreen",
  lightGreen: "bg-lightGreen",
};

const textClassMap = {
  background: "text-background",
  primary: "text-primary",
  mediumGreen: "text-mediumGreen",
  darkGreen: "text-darkGreen",
  lightGreen: "text-lightGreen",
};

function Button({
  children,
  href,
  bgColor = "primary",
  textColor = "background",
  borderColor,
  additionalClasses = "",
  onClick,
  type = "button",
  disabled,
}) {
  const styles = `${bgClassMap[bgColor] || "bg-primary"} ${
    textClassMap[textColor] || "text-background"
  } w-max flex items-center justify-center gap-2.5 py-1.5 px-3.5 rounded text-sm font-semibold cursor-pointer hover:opacity-90 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-80 ${additionalClasses} ${
    borderColor ? `border border-${borderColor}` : ""
  }`;

  if (href)
    return (
      <Link className={styles} href={href}>
        {children}
      </Link>
    );

  return (
    <button
      className={styles}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
