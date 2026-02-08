import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import Chip from '@mui/material/Chip';

interface Amenity {
  name: string;
  category: string;
  description: string;
  status: string;
}

const data: Amenity[] = [
  {
    name: 'Wi-Fi',
    category: 'Technology',
    description: 'High-speed wireless internet',
    status: 'Active'
  },
  {
    name: 'Air Conditioning',
    category: 'Comfort',
    description: 'Individual climate control',
    status: 'Active'
  },
  {
    name: 'Swimming Pool',
    category: 'Recreation',
    description: 'Outdoor pool access',
    status: 'Inactive'
  }
];

const columns: ColumnDef<Amenity>[] = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Category', accessorKey: 'category' },
  { header: 'Description', accessorKey: 'description' },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => (
      <Chip
        label={getValue<string>()}
        size="small"
        color={getValue() === 'Active' ? 'success' : 'default'}
      />
    )
  }
];

export default function AmenityList() {
  return (
    <GenericTable<Amenity>
      data={data}
      columns={columns}
      filename="amenities.csv"
    />
  );
}
