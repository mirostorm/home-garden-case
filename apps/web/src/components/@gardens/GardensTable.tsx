'use client';

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/@ui/Table';
import { Garden } from '@/types/garden.types';

interface Props {
  gardens: Garden[];
  isLoading?: boolean;
  error?: string;
}

const GardensTable = ({ gardens, isLoading, error }: Props) => {
  return (
    <Table>
      <TableHeader className="border-y border-gray-100">
        <TableRow>
          <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500">
            #
          </TableCell>
          <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500">
            Name
          </TableCell>
          <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500">
            Total Surface Area
          </TableCell>
          <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500">
            Location
          </TableCell>
          <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500">
            Updated at
          </TableCell>
          <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500">
            Actions
          </TableCell>
        </TableRow>
      </TableHeader>

      <TableBody className="divide-y divide-gray-100">
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
              <TableCell className="py-3 text-gray-700">{index + 1}</TableCell>
              <TableCell className="py-3">
                <div className="flex flex-col justify-center">
                  <p className="text-lg font-medium text-black">{gardenName}</p>
                  <span className="text-theme-xs text-gray-700">{locationDescription}</span>
                </div>
              </TableCell>
              <TableCell className="py-3 text-lg font-medium text-black">
                {totalSurfaceArea} m²
              </TableCell>
              <TableCell className="py-3 text-black">
                {latitude}, {longitude}
              </TableCell>
              <TableCell className="py-3 text-black">{updatedAt}</TableCell>
              <TableCell className="py-3 text-black">@TODO</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default GardensTable;
