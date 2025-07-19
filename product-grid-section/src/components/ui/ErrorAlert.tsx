// src/components/ui/ErrorAlert.tsx
interface ErrorAlertProps {
  message: string;
}
export const ErrorAlert = ({ message }: ErrorAlertProps) => (
  <div role="alert" className="mx-auto my-8 w-full max-w-md rounded border border-red-400 bg-red-50 p-4 text-red-700">
    <p className="font-semibold">Something went wrong</p>
    <p className="text-sm">{message}</p>
  </div>
);
