import { Toaster as Sonner } from "sonner@2.0.3";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: "white",
          color: "#1f2937",
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
          padding: "1rem",
        },
        className: "shadow-lg",
      }}
    />
  );
}
