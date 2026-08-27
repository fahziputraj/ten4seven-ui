import React from "react";

export function PageContainer({ size = "full", as = "div", children, className = "", style, ...rest }) {
  const Tag = as;
  return <Tag className={`aapm-page-container ${className}`.trim()} data-size={size} style={style} {...rest}>{children}</Tag>;
}
