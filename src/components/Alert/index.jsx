import { Toaster as HotToaster, toast } from "react-hot-toast";

export const showSuccess = (message) => toast.success(message);
export const showError = (message) => toast.error(message);
export const showWarning = (message) =>
  toast(message, { style: { background: "#FFD700", color: "#222" } });
export const showInfo = (message) =>
  toast(message, { style: { background: "#2196F3", color: "white" } });

const Alert = () => {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          padding: "16px",
          fontWeight: 500,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    />
  );
};

export default Alert;
