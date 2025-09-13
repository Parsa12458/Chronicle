import Link from "next/link";
import { TbCalendarSmile } from "react-icons/tb";

const colorClassMap = {
  primary: "text-primary",
  darkGreen: "text-darkGreen",
  mediumGreen: "text-mediumGreen",
  background: "text-background",
};

const strokeClassMap = {
  primary: "stroke-primary",
  darkGreen: "stroke-darkGreen",
  mediumGreen: "stroke-mediumGreen",
  background: "stroke-background",
};

function Logo({ color = "primary" }) {
  return (
    <Link href="/" className="flex items-center gap-1.5">
      <span
        className={`text-2xl font-semibold ${
          colorClassMap[color] || "text-primary"
        }`}
      >
        Chronicle
      </span>
      <TbCalendarSmile
        className={`${strokeClassMap[color] || "stroke-primary"} -mt-0.5`}
        size={28}
        strokeWidth={1.8}
      />
    </Link>
  );
}

export default Logo;
