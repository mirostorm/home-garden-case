import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Spinner,
} from '@/components/ui';
import { ReactNode, startTransition, SubmitEvent } from 'react';

interface Props {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: ReactNode;
  submitText?: string;
  children: ReactNode;
  formAction: (formData: FormData) => void | Promise<void>;
  isPending?: boolean;
  error?: string;
}

const FormDialog = ({
  isOpen,
  onOpenChange,
  title,
  submitText = 'Submit',
  children,
  formAction,
  isPending = false,
  error,
}: Props) => {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    startTransition(() => formAction(formData));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[40svw] max-w-[80svw] max-h-[80svh] overflow-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>
            <span className="text-md font-bold">{title}</span>
          </DialogTitle>
        </DialogHeader>

        <form
          // action={formAction}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {children}

          <DialogFooter>
            {error && <span className="text-destructive font-semibold italic py-2">{error}</span>}
            <DialogClose
              render={
                <Button variant="destructive" size="lg" disabled={isPending}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" size="lg" className="w-40" disabled={isPending}>
              {isPending && <Spinner data-icon="inline-start" />}
              {submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
