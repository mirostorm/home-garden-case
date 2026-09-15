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
          <TableHead>#</TableHead>
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
        {gardens.map(
          (
            {
              gardenId,
              gardenName,
              totalSurfaceArea,
              locationDescription,
              latitude,
              longitude,
              updatedAt,
            },
            index,
          ) => (
            <TableRow key={gardenId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className=" text-lg font-medium">{gardenName}</TableCell>
              <TableCell>{locationDescription ?? '-'}</TableCell>
              <TableCell>{totalSurfaceArea} m²</TableCell>
              <TableCell>{latitude && longitude && `${latitude}, ${longitude}`}</TableCell>
              <TableCell>{updatedAt}</TableCell>
              <TableCell>@TODO</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default GardensTable;
