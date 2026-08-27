import React from "react";
import { Icon } from "../core/Icon.jsx";

function normalizeOption(option) {
  if (typeof option === "string" || typeof option === "number") return { value: String(option), label: String(option) };
  return option || { value: "", label: "" };
}

/** Searchable single-select with a stable keyboard and screen-reader contract. */
export function Combobox({
  id,
  label,
  value,
  defaultValue = "",
  onChange,
  options = [],
  placeholder = "Pilih opsi",
  searchPlaceholder = "Cari opsi...",
  emptyText = "Tidak ada opsi yang cocok.",
  helpText,
  error,
  invalid = false,
  disabled = false,
  clearable = true,
  name,
  className = "",
  style,
  ...rest
}) {
  const generatedId = React.useId();
  const inputId = id || `aapm-combobox-${generatedId}`;
  const listboxId = `${inputId}-listbox`;
  const rootRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const selectedValue = value !== undefined ? value : uncontrolledValue;
  const normalized = React.useMemo(() => options.map(normalizeOption), [options]);
  const selected = normalized.find((option) => String(option.value) === String(selectedValue));
  const filtered = React.useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return normalized.filter((option) => !needle || `${option.label} ${option.description || ""}`.toLocaleLowerCase().includes(needle));
  }, [normalized, query]);

  React.useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  React.useEffect(() => {
    if (highlightedIndex >= filtered.length) setHighlightedIndex(Math.max(0, filtered.length - 1));
  }, [filtered.length, highlightedIndex]);

  const selectOption = (option) => {
    if (option.disabled) return;
    if (value === undefined) setUncontrolledValue(option.value);
    onChange?.(option.value, option);
    setQuery("");
    setOpen(false);
  };

  const clear = () => {
    if (value === undefined) setUncontrolledValue("");
    onChange?.("", null);
    setQuery("");
    setOpen(false);
  };

  const handleKeyDown = (event) => {
    if (disabled) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setHighlightedIndex((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setHighlightedIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && open && filtered[highlightedIndex]) {
      event.preventDefault();
      selectOption(filtered[highlightedIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
    } else if (event.key === "Home" && open) {
      event.preventDefault();
      setHighlightedIndex(0);
    } else if (event.key === "End" && open) {
      event.preventDefault();
      setHighlightedIndex(Math.max(filtered.length - 1, 0));
    }
  };

  return (
    <div ref={rootRef} className={`aapm-combobox ${className}`.trim()} data-invalid={invalid || error ? "true" : "false"} data-disabled={disabled ? "true" : "false"} style={style} {...rest}>
      {label && <label className="aapm-combobox__label" htmlFor={inputId}>{label}</label>}
      <div className="aapm-combobox__control">
        <input
          id={inputId}
          name={name}
          className="aapm-combobox__input"
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          aria-activedescendant={open && filtered[highlightedIndex] ? `${inputId}-option-${highlightedIndex}` : undefined}
          aria-invalid={invalid || error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
          value={query || selected?.label || ""}
          placeholder={open ? searchPlaceholder : placeholder}
          disabled={disabled}
          onFocus={() => setOpen(true)}
          onChange={(event) => { setQuery(event.target.value); setOpen(true); setHighlightedIndex(0); }}
          onKeyDown={handleKeyDown}
        />
        {clearable && selected && !disabled && <button type="button" className="aapm-combobox__clear" aria-label="Hapus pilihan" onClick={clear}><Icon name="close" size={14} /></button>}
        <span className="aapm-combobox__icon"><Icon name={open ? "chevronUp" : "chevronDown"} size={18} /></span>
      </div>
      {open && !disabled && (
        <div id={listboxId} className="aapm-combobox__listbox" role="listbox" aria-label={label || "Pilihan"}>
          {filtered.length ? filtered.map((option, index) => (
            <div
              id={`${inputId}-option-${index}`}
              key={option.value}
              className="aapm-combobox__option"
              role="option"
              aria-selected={String(option.value) === String(selectedValue)}
              data-selected={String(option.value) === String(selectedValue) ? "true" : "false"}
              data-highlighted={highlightedIndex === index ? "true" : "false"}
              data-disabled={option.disabled ? "true" : "false"}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
            >
              {option.icon && <span className="aapm-combobox__option-icon"><Icon name={option.icon} size={18} /></span>}
              <span className="aapm-combobox__option-copy">
                <span className="aapm-combobox__option-label">{option.label}</span>
                {option.description && <span className="aapm-combobox__option-description">{option.description}</span>}
              </span>
              {String(option.value) === String(selectedValue) && <span className="aapm-combobox__check"><Icon name="check" size={16} /></span>}
            </div>
          )) : <div className="aapm-combobox__empty">{emptyText}</div>}
        </div>
      )}
      {error ? <div id={`${inputId}-error`} className="aapm-combobox__error">{error}</div> : helpText ? <div id={`${inputId}-help`} className="aapm-combobox__help">{helpText}</div> : null}
    </div>
  );
}
