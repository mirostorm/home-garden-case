'use client';

import { updateGarden } from '@/actions/garden.actions';
import { useActionState, useEffect, useRef } from 'react';
import { FormInput, FormTextArea } from '../@form';

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
import { Garden } from '@/types/garden.types';
import { DialogRootActions } from '@base-ui/react';
import { PencilIcon } from '@phosphor-icons/react';

type Props = Garden & {
  triggerLabel?: string;
};

const UpdateGardenForm = ({
  triggerLabel,
  gardenId,
  gardenName,
  totalSurfaceArea,
  locationDescription,
  latitude,
  longitude,
}: Props) => {
  const dialogRef = useRef<DialogRootActions | null>(null);
  const [state, action, pending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      return await updateGarden(previousState, formData);
    },
    null,
  );

  useEffect(() => {
    if (state) dialogRef.current?.close();
  }, [state]);

  return (
    <Dialog actionsRef={dialogRef}>
      <DialogTrigger>
        <Button variant="secondary">
          <PencilIcon data-icon="inline-start" />
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[40svw] max-w-[80svw] max-h-[80svh] overflow-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>
            <span className="text-md font-bold">
              Edit garden: "<strong>{gardenName}</strong>"
            </span>
          </DialogTitle>
        </DialogHeader>

        <form action={action} className="flex flex-col gap-4">
          <FormInput id="gardenId" required defaultValue={gardenId} hidden />
          <FormInput
            id="gardenName"
            label="Garden name"
            placeholder="My garden"
            required
            defaultValue={gardenName}
            disabled={pending}
          />
          <FormInput
            id="totalSurfaceArea"
            label="Total surface area"
            type="number"
            placeholder="0"
            min={0}
            endAdornment={<span className="font-semibold ml-3">m²</span>}
            required
            disabled={pending}
            defaultValue={totalSurfaceArea}
          />
          <FormTextArea
            id="locationDescription"
            label="Garden description"
            placeholder="A description of my garden..."
            disabled={pending}
            defaultValue={locationDescription}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormInput
              id="latitude"
              label="Latitude"
              type="number"
              placeholder="0"
              min={-90}
              max={90}
              disabled={pending}
              defaultValue={latitude}
            />
            <FormInput
              id="longitude"
              label="Longitude"
              type="number"
              placeholder="0"
              min={-180}
              max={180}
              disabled={pending}
              defaultValue={longitude}
            />
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button variant="destructive" size="lg" disabled={pending}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" size="lg" className="w-40" disabled={pending}>
              {pending && <Spinner data-icon="inline-start" />}
              Update garden
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGardenForm;
