import { toast, ToastOptions } from "react-hot-toast";

export const ErrorToast = (message: string, options?: ToastOptions) =>
    toast.error(message, options);
