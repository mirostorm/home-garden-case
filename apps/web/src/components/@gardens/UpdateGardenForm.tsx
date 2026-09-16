'use client';

import { updateGarden } from '@/actions/garden.actions';
import { useActionState } from 'react';
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
  const [_state, action, pending] = useActionState(updateGarden, null);

  return (
    <FormDialog
      formAction={action}
      title={
        <>
          Edit garden: "<strong>{gardenName}</strong>"
        </>
      }
      submitText="Update garden"
      isPending={pending}
      trigger={
        <Button variant="secondary">
          <PencilIcon data-icon="inline-start" />
          {triggerLabel}
        </Button>
      }
    >
      <BaseGardenForm gardenId={gardenId} garden={garden} isPending={pending} />
    </FormDialog>
  );
};

export default UpdateGardenForm;
