'use client';

import { createGarden } from '@/actions/garden.actions';
import { useActionState } from 'react';
import { FormDialog } from '../@form';

import { Button } from '@/components/ui';
import { PlusIcon } from '@phosphor-icons/react';
import BaseGardenForm from './BaseGardenForm';

const CreateGardenForm = () => {
  const [_state, action, pending] = useActionState(createGarden, null);

  return (
    <FormDialog
      submitText="Add garden"
      formAction={action}
      isPending={pending}
      title="Add new garden"
      trigger={
        <Button variant="default">
          <PlusIcon data-icon="inline-start" />
          New Garden
        </Button>
      }
    >
      <BaseGardenForm isPending={pending} />
    </FormDialog>
  );
};

export default CreateGardenForm;
