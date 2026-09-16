'use client';

import { deleteGarden } from '@/actions/garden.actions';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
} from '@/components/ui';
import { TrashSimpleIcon } from '@phosphor-icons/react';
import { useActionState } from 'react';
import { FormInput } from '../../@form';

interface Props {
  gardenId: number;
  gardenName: string;
  buttonLabel?: string;
}

const DeleteGardenDialog = ({ gardenId, gardenName, buttonLabel }: Props) => {
  const [_state, action, pending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      return await deleteGarden(previousState, formData);
    },
    null,
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" title="Remove garden" />}>
        <TrashSimpleIcon data-icon="inline-start" />
        {buttonLabel}
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-[40svw] max-w-[80svw] max-h-[80svh] overflow-auto transition-all duration-300">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this garden?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to delete "<strong>{gardenName}</strong>"?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="default" disabled={pending}>
            Cancel
          </AlertDialogCancel>
          <form action={action}>
            <FormInput id="gardenId" required defaultValue={gardenId} hidden />
            <AlertDialogAction type="submit" variant="destructive" disabled={pending}>
              Remove garden
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGardenDialog;
