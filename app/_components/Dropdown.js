"use client";

import {
  useFloating,
  flip,
  shift,
  autoUpdate,
  useTransitionStyles,
  offset,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";

function Dropdown({
  button,
  content,
  mainAxisOffset = 0,
  crossAxisOffset = 0,
  placement = "bottom-end",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, strategy, refs, context } = useFloating({
    middleware: [
      offset({
        mainAxis: mainAxisOffset,
        crossAxis: crossAxisOffset,
      }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement,
  });

  const { isMounted, styles } = useTransitionStyles(context);

  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <div className="relative">
      <div
        ref={refs.setReference}
        {...getReferenceProps({
          onClick: () => setIsOpen((prev) => !prev),
        })}
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-full cursor-pointer"
      >
        {button}
      </div>
      {isMounted && (
        <ul
          ref={refs.setFloating}
          {...getFloatingProps({
            style: {
              ...styles,
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            },
          })}
          className="menu z-10 w-max rounded bg-mintGreen p-1 shadow-md"
        >
          {content}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
