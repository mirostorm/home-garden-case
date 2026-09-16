'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Garden } from '@/types/garden.types';
import { ArrowRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from '../ui';
import DeleteGardenDialog from './DeleteGardenDialog';
import UpdateGardenForm from './UpdateGardenForm';

interface Props {
  gardens: Garden[];
  isLoading?: boolean;
  error?: string;
}

const GardensTable = ({ gardens, isLoading, error }: Props) => {
  return (
    <Table>
      <TableCaption>A list of your gardens.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Total Surface Area</TableHead>
          <TableHead>
            Location <span className="font-normal italic">(latitude, longitude)</span>
          </TableHead>
          <TableHead>Updated at</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {gardens.map((garden, index) => {
          const {
            gardenId,
            gardenName,
            totalSurfaceArea,
            locationDescription,
            latitude,
            longitude,
            updatedAt,
          } = garden;
          return (
            <TableRow key={gardenId}>
              <TableCell
                title={gardenName}
                className="max-w-40 text-lg font-medium overflow-hidden text-ellipsis"
              >
                {gardenName}
              </TableCell>
              <TableCell
                className="max-w-48 text-ellipsis overflow-hidden"
                title={locationDescription}
              >
                {locationDescription ?? '-'}
              </TableCell>
              <TableCell>{totalSurfaceArea} m²</TableCell>
              <TableCell>{latitude && longitude && `${latitude}, ${longitude}`}</TableCell>
              <TableCell>{updatedAt}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Link href={`/gardens/${gardenId}`}>
                  <Button size="icon" variant="secondary" title={`View ${gardenName}`}>
                    <ArrowRightIcon />
                  </Button>
                </Link>
                <UpdateGardenForm {...garden} />
                <DeleteGardenDialog gardenId={gardenId} gardenName={gardenName} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default GardensTable;
