import {
  CheckCircledIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons';

interface FormProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormProps) => {
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

export const FormError = ({ message }: FormProps) => {
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
