import React from "react";

export function Divider({ orientation = "horizontal", label, className = "", style, ...rest }) {
  const vertical = orientation === "vertical";
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`aapm-divider aapm-divider--${vertical ? "vertical" : "horizontal"} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {label && <span>{label}</span>}
    </div>
  );
}
