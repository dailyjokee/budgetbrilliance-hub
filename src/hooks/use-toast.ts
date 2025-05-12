
// This file handles toast functionality
import { toast as sonnerToast } from "sonner";

export const toast = sonnerToast;

export type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

// Custom hook to match the expected interface from our components
export const useToast = () => {
  return {
    toast: sonnerToast,
    toasts: [] as any[], // Using any[] instead of Toast[] since Toast is not exported
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    },
    clear: () => sonnerToast.dismiss()
  };
};
