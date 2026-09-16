'use client';

import { deletePlant } from '@/actions/plant.actions';
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
  plantId: number;
  plantName: string;
  buttonLabel?: string;
}

const DeletePlantDialog = ({ gardenId, plantId, plantName, buttonLabel }: Props) => {
  const [_state, action, pending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      return await deletePlant(previousState, formData);
    },
    null,
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" title="Remove plant" />}>
        <TrashSimpleIcon data-icon="inline-start" />
        {buttonLabel}
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-[40svw] max-w-[80svw] max-h-[80svh] overflow-auto transition-all duration-300">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this plant?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to delete "<strong>{plantName}</strong>"?
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
            <FormInput id="plantId" required defaultValue={plantId} hidden />
            <AlertDialogAction type="submit" variant="destructive" disabled={pending}>
              Remove plant
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePlantDialog;
