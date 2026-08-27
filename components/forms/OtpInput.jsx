import React from "react";

export function OtpInput({ length = 6, value = "", onValueChange, invalid = false, disabled, autoFocus = true, style, ...rest }) {
  const refs = React.useRef([]);
  const chars = String(value).padEnd(length, " ").slice(0, length).split("");
  const set = (i, ch) => {
    const next = chars.map((c, j) => (j === i ? ch : c)).join("").replace(/ /g, "");
    onValueChange?.(next);
    if (ch && i < length - 1) refs.current[i + 1]?.focus();
  };
  return (
    <div style={{ display: "flex", gap: "var(--space-2)", ...style }} {...rest}>
      {chars.map((c, i) => (
        <input key={i} ref={(el) => { refs.current[i] = el; }}
          inputMode="numeric" maxLength={1} value={c.trim()} disabled={disabled} autoFocus={autoFocus && i === 0}
          aria-label={"Digit " + (i + 1) + " dari " + length} aria-invalid={invalid || undefined}
          onChange={(e) => set(i, e.target.value.replace(/[^\d]/g, "").slice(-1))}
          onKeyDown={(e) => { if (e.key === "Backspace" && !c.trim() && i > 0) refs.current[i - 1]?.focus(); }}
          onPaste={(e) => { e.preventDefault(); onValueChange?.(e.clipboardData.getData("text").replace(/[^\d]/g, "").slice(0, length)); }}
          style={{
            width: 44, height: 52, textAlign: "center", borderRadius: "var(--radius-control)", outline: "none",
            border: "1px solid " + (invalid ? "var(--danger)" : "var(--input)"),
            background: "var(--surface-elevated)", color: "var(--foreground)",
            fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-semibold)",
            fontVariantNumeric: "tabular-nums", opacity: disabled ? 0.5 : 1,
            transition: "border-color var(--duration-fast),box-shadow var(--duration-fast)",
          }}
          onFocus={(e) => { e.target.style.borderColor = "hsl(var(--brand-green-hsl) / .65)"; e.target.style.boxShadow = "0 0 0 3px hsl(var(--ring-hsl) / .25)"; e.target.style.background = "var(--card)"; }}
          onBlur={(e) => { e.target.style.borderColor = invalid ? "var(--danger)" : "var(--input)"; e.target.style.boxShadow = "none"; e.target.style.background = "var(--surface-elevated)"; }}
        />
      ))}
    </div>
  );
}
