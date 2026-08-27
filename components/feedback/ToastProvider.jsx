import React from "react";
import { Toast } from "./Toast.jsx";

const ToastContext = React.createContext(null);
let nextToastId = 0;

function toneStyle(tone) {
  const map = { success: "var(--success)", danger: "var(--danger)", warning: "var(--warning)", info: "var(--info)", neutral: "var(--foreground)" };
  return { borderInlineStartColor: map[tone] || map.neutral };
}

export function ToastViewport({ toasts, dismiss }) {
  return (
    <div className="aapm-toast-viewport" aria-label="Notifikasi" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="aapm-toast-item" data-tone={toast.tone || "neutral"}>
          <Toast {...toast} style={{ ...toneStyle(toast.tone || "neutral"), ...toast.style }} onClose={() => dismiss(toast.id)} />
        </div>
      ))}
    </div>
  );
}

/** App-level notification orchestration. Call `const { notify } = useToast()`. */
export function ToastProvider({ children, defaultDuration = 4500 }) {
  const [toasts, setToasts] = React.useState([]);
  const timers = React.useRef(new Map());

  const dismiss = React.useCallback((id) => {
    const timer = timers.current.get(id);
    if (timer) globalThis.clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = React.useCallback((toast) => {
    const id = toast.id || `toast-${Date.now()}-${nextToastId++}`;
    const next = { tone: "info", duration: defaultDuration, ...toast, id };
    const oldTimer = timers.current.get(id);
    if (oldTimer) globalThis.clearTimeout(oldTimer);
    setToasts((current) => [...current.filter((item) => item.id !== id), next]);
    if (next.duration !== false && next.duration > 0) timers.current.set(id, globalThis.setTimeout(() => dismiss(id), next.duration));
    return id;
  }, [defaultDuration, dismiss]);

  const value = React.useMemo(() => ({ notify, dismiss, toasts }), [dismiss, notify, toasts]);
  return <ToastContext.Provider value={value}>{children}<ToastViewport toasts={toasts} dismiss={dismiss} /></ToastContext.Provider>;
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast harus digunakan di dalam ToastProvider.");
  return context;
}
