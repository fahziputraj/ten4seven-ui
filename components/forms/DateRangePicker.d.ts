/** Reporting period: two bounded dates plus the standard presets. */
export interface DatePreset { id: string; label: string }
export interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ISO `YYYY-MM-DD`. */
  from?: string;
  to?: string;
  onChange?: (range: { from?: string; to?: string }) => void;
  size?: "sm" | "md" | "lg";
  /** Defaults to the canonical five: 7 hari, 30 hari, bulan ini, kuartal ini, tahun ini. Pass [] to hide. */
  presets?: DatePreset[];
  activePreset?: string;
  onPreset?: (id: string) => void;
}
export declare function DateRangePicker(props: DateRangePickerProps): JSX.Element;
/** The canonical preset list. Reuse it so every report offers the same periods. */
export declare const datePresets: DatePreset[];
