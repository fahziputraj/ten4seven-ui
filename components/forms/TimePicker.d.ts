import * as React from "react";

export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  icon?: string;
  invalid?: boolean;
  size?: "sm" | "md" | "lg";
}

export declare function TimePicker(props: TimePickerProps): React.ReactElement;
