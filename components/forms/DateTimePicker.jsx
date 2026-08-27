import React from "react";
import { Input } from "./Input.jsx";

/** Native local date-time input; value follows the HTML datetime-local format. */
export function DateTimePicker({ value = "", onValueChange, onChange, icon = "clock", ...rest }) {
  const handleChange = (event) => {
    onValueChange?.(event.target.value);
    onChange?.(event);
  };

  return <Input type="datetime-local" value={value} onChange={handleChange} icon={icon} {...rest} />;
}
