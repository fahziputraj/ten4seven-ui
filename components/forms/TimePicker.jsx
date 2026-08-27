import React from "react";
import { Input } from "./Input.jsx";

/** Native, locale-safe time input with the AAPM Input contract. */
export function TimePicker({ value = "", onValueChange, onChange, icon = "clock", ...rest }) {
  const handleChange = (event) => {
    onValueChange?.(event.target.value);
    onChange?.(event);
  };

  return <Input type="time" value={value} onChange={handleChange} icon={icon} {...rest} />;
}
