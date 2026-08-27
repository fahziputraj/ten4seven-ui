import * as React from "react";

export interface DateTimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  /** Local HTML datetime-local value, for example 2026-08-27T14:30. */
  value?: string;
  onValueChange?: (value: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  icon?: string;
  invalid?: boolean;
  size?: "sm" | "md" | "lg";
}

export declare function DateTimePicker(props: DateTimePickerProps): React.ReactElement;
