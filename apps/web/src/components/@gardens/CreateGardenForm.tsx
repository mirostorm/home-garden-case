'use client';

import { createGarden } from '@/actions/garden.actions';
import { useActionState, useState } from 'react';
import { FormDialog } from '../@form';

import { Button } from '@/components/ui';
import { PlusIcon } from '@phosphor-icons/react';
import BaseGardenForm from './BaseGardenForm';

const CreateGardenForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, pending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const res = await createGarden(prevState, formData);
      if (res.success) setIsOpen(false);
      return res;
    },
    null,
  );

  return (
    <>
      <Button variant="default" onClick={() => setIsOpen(true)}>
        <PlusIcon data-icon="inline-start" />
        New Garden
      </Button>

      <FormDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        submitText="Add garden"
        formAction={action}
        isPending={pending}
        title="Add new garden"
        error={typeof state?.error === 'string' ? state.error : undefined}
      >
        <BaseGardenForm isPending={pending} errors={state?.error} />
      </FormDialog>
    </>
  );
};

export default CreateGardenForm;
