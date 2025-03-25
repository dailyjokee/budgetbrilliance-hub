
import { toast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export function useToast() {
  return {
    toast: (props: ToastProps) => {
      const { title, description, variant } = props;
      if (variant === "destructive") {
        toast.error(title, {
          description,
        });
      } else {
        toast(title, {
          description,
        });
      }
    },
    toasts: [], // Add this to fix the build error
  };
}
