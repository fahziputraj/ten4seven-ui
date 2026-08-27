import React from "react";
import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";

const fileIcon = (name = "") => /\.pdf$/i.test(name) ? "pdf" : /\.(xlsx?|csv)$/i.test(name) ? "spreadsheet" : /\.(png|jpe?g|webp|gif)$/i.test(name) ? "image" : "file";

export function FileUpload({
  files = [], onAdd, onRemove, accept, multiple = true, hint = "PDF, JPG atau XLSX · maksimal 10 MB per berkas",
  label = "Seret berkas ke sini atau klik untuk memilih", invalid = false, disabled, required, style, ...rest
}) {
  const [over, setOver] = React.useState(false);
  const input = React.useRef(null);
  const pick = (list) => { if (list && list.length) onAdd?.(Array.from(list).map((x) => ({ name: x.name, size: x.size }))); };
  return (
    <div style={style} {...rest}>
      <div onClick={() => !disabled && input.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); if (!disabled) pick(e.dataTransfer.files); }}
        role="button" tabIndex={0} aria-disabled={disabled || undefined}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 6,
          padding: "var(--space-6) var(--space-4)", borderRadius: "var(--radius-panel)", cursor: disabled ? "not-allowed" : "pointer",
          border: "1px dashed " + (invalid ? "var(--danger)" : over ? "var(--border-focus)" : "var(--border)"),
          background: over ? "hsl(var(--brand-green-hsl) / .05)" : invalid ? "hsl(var(--danger-hsl) / .04)" : "var(--surface-subtle)",
          opacity: disabled ? 0.55 : 1, transition: "background-color var(--duration-fast),border-color var(--duration-fast)",
        }}>
        <span style={{ display: "inline-flex", height: 40, width: 40, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-control)", background: "var(--tint-green)", color: "var(--tint-green-foreground)" }}>
          <Icon name="upload" size={19} />
        </span>
        <span style={{ font: "var(--type-label)", color: "var(--foreground)" }}>{label}{required && <span style={{ color: "var(--danger)" }}> *</span>}</span>
        {hint && <span style={{ font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{hint}</span>}
        <input ref={input} type="file" accept={accept} multiple={multiple} disabled={disabled}
          onChange={(e) => pick(e.target.files)} style={{ display: "none" }} />
      </div>
      {files.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: "var(--space-3)" }}>
          {files.map((file, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-2) var(--space-3)",
              borderRadius: "var(--radius-control)", border: "1px solid var(--border)", background: "var(--card)",
            }}>
              <Icon name={fileIcon(file.name)} size={18} style={{ flex: "none", color: file.error ? "var(--danger)" : "var(--muted-foreground)" }} />
              <span style={{ minWidth: 0, flex: 1 }}>
                <span style={{ display: "block", font: "var(--type-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                <span style={{ display: "block", marginTop: 1, font: "var(--type-caption)", color: file.error ? "var(--danger)" : "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>
                  {file.error || (file.progress != null && file.progress < 100 ? "Mengunggah " + file.progress + "%" : file.sizeLabel || (file.size != null ? Math.round(file.size / 1024) + " KB" : "Terunggah"))}
                </span>
              </span>
              {file.progress != null && file.progress < 100 && !file.error && (
                <span style={{ flex: "none", width: 72, height: 4, borderRadius: "var(--radius-full)", background: "var(--surface-inset)", overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: file.progress + "%", background: "var(--brand-lime)" }} />
                </span>
              )}
              {onRemove && <IconButton icon="delete" label={"Hapus " + file.name} size="sm" tone="danger" onClick={() => onRemove(i)} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
