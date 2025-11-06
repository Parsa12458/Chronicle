"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";

function SubmitButton({ children, ...rest }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...rest}>
      {children}
      {pending && <div className="button-loader"></div>}
    </Button>
  );
}

export default SubmitButton;
