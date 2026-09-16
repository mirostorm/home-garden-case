import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from '@/components/ui';
import { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  submitText?: string;
  trigger: ReactNode;
  children: ReactNode;
  formAction: (formData: FormData) => void | Promise<void>;
  isPending?: boolean;
  error?: string;
}

const FormDialog = ({
  title,
  submitText = 'Submit',
  trigger,
  children,
  formAction,
  isPending = false,
  error,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent className="min-w-[40svw] max-w-[80svw] max-h-[80svh] overflow-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>
            <span className="text-md font-bold">{title}</span>
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-4">
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
