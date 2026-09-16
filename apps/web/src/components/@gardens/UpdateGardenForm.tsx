'use client';

import { updateGarden } from '@/actions/garden.actions';
import { useActionState, useState } from 'react';
import { FormDialog } from '../@form';

import { Button } from '@/components/ui';
import { Garden } from '@/types/garden.types';
import { PencilIcon } from '@phosphor-icons/react';
import BaseGardenForm from './BaseGardenForm';

interface Props {
  triggerLabel?: string;
  garden: Garden;
}

const UpdateGardenForm = ({ triggerLabel, garden }: Props) => {
  const { gardenId, gardenName } = garden;

  const [isOpen, setIsOpen] = useState(false);
  const [state, action, pending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const res = await updateGarden(prevState, formData);
      if (res.success) setIsOpen(false);
      return res;
    },
    null,
  );

  return (
    <>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        <PencilIcon data-icon="inline-start" />
        {triggerLabel}
      </Button>

      <FormDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        formAction={action}
        title={
          <>
            Edit garden: "<strong>{gardenName}</strong>"
          </>
        }
        submitText="Update garden"
        isPending={pending}
        error={typeof state?.error === 'string' ? state.error : undefined}
      >
        <BaseGardenForm
          gardenId={gardenId}
          garden={garden}
          isPending={pending}
          errors={state?.error}
        />
      </FormDialog>
    </>
  );
};

export default UpdateGardenForm;
