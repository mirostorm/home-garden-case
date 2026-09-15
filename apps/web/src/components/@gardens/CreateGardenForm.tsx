'use client';

import { createGarden } from '@/actions/garden.actions';
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
import { DialogRootActions } from '@base-ui/react';
import { PlusIcon } from '@phosphor-icons/react';

const CreateGardenForm = () => {
  const dialogRef = useRef<DialogRootActions | null>(null);
  const [state, action, pending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      return await createGarden(previousState, formData);
    },
    null,
  );

  useEffect(() => {
    if (!!state) dialogRef.current?.close();
  }, [state]);

  return (
    <Dialog actionsRef={dialogRef}>
      <DialogTrigger>
        <Button variant="default">
          <PlusIcon data-icon="inline-start" />
          New Garden
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[40svw] max-w-[80svw] max-h-[80svh] overflow-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>
            <span className="text-md font-bold">Add new garden</span>
          </DialogTitle>
        </DialogHeader>

        <form action={action} className="flex flex-col gap-4">
          <FormInput
            id="gardenName"
            label="Garden name"
            placeholder="My garden"
            required
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
          />
          <FormTextArea
            id="locationDescription"
            label="Garden description"
            placeholder="A description of my garden..."
            disabled={pending}
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
            />
            <FormInput
              id="longitude"
              label="Longitude"
              type="number"
              placeholder="0"
              min={-180}
              max={180}
              disabled={pending}
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
              Add garden
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGardenForm;
