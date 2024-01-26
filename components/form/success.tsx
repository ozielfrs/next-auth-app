import { CheckCircledIcon } from "@radix-ui/react-icons";

interface SuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: SuccessProps) => {
  if (!message) return null;

  return (
    <>
      <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
        <CheckCircledIcon className="inline-block w-4 h-4 mr-1" />
        <span className="align-middle">{message}</span>
      </div>
    </>
  );
};
