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
  additionalClasses = "",
}) {
  const styles = `${bgClassMap[bgColor] || "bg-primary"} ${
    textClassMap[textColor] || "text-background"
  } w-max py-1.5 px-3.5 rounded text-sm font-semibold cursor-pointer hover:opacity-90 transition-all duration-300 ${additionalClasses}`;

  if (href)
    return (
      <Link className={styles} href={href}>
        {children}
      </Link>
    );

  return <button className={styles}>{children}</button>;
}

export default Button;
