'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

import { Garden } from '@/types/garden.types';
import GardenRow from './GardenRow';

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
        {!gardens.length ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center font-bold">
              No gardens found
            </TableCell>
          </TableRow>
        ) : (
          gardens.map((garden) => <GardenRow {...garden} key={garden.gardenId} />)
        )}
      </TableBody>
    </Table>
  );
};

export default GardensTable;
