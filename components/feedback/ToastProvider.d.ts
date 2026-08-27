export interface ToastInput { id?: string; tone?: "success" | "danger" | "warning" | "info" | "neutral"; title: React.ReactNode; description?: React.ReactNode; action?: React.ReactNode; duration?: number | false; style?: React.CSSProperties; }
export interface ToastContextValue { notify: (toast: ToastInput) => string; dismiss: (id: string) => void; toasts: ToastInput[]; }
export declare function ToastProvider(props: { children: React.ReactNode; defaultDuration?: number }): JSX.Element;
export declare function ToastViewport(props: { toasts: ToastInput[]; dismiss: (id: string) => void }): JSX.Element;
export declare function useToast(): ToastContextValue;
