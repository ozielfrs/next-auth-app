import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface ErrorProps {
  message?: string;
}

export const FormError = ({ message }: ErrorProps) => {
  if (!message) return null;

  return (
    <>
      <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <ExclamationTriangleIcon className="inline-block w-4 h-4 mr-1" />
        <span className="align-middle">{message}</span>
      </div>
    </>
  );
};
