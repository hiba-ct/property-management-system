import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import { Eye, Edit, Trash } from 'iconsax-reactjs';
import { useNavigate } from 'react-router-dom';

interface Guest {
  id: string;
  name: string;
  phone: string;
  email: string;
  nationality: string;
}

const data: Guest[] = [
  {
    id: 'G001',
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john@gmail.com',
    nationality: 'Indian'
  }
];

export default function GuestList() {
  const navigate = useNavigate();

  const columns: ColumnDef<Guest>[] = [
    { header: 'Guest ID', accessorKey: 'id' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Phone', accessorKey: 'phone' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Nationality', accessorKey: 'nationality' },

    // ✅ SINGLE ACTIONS COLUMN
    {
      header: 'guest profile',
      cell: ({ row }) => (
        <Stack direction="row" spacing={1} alignItems="center">
          {/* View */}
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<Eye size={16} />}
            onClick={() =>
              navigate(`/pms/guests/details/${row.original.id}`)
            }
          >
            View
          </Button>

       

        </Stack>
      )
    }
  ];

  return (
    <GenericTable<Guest>
      data={data}
      columns={columns}
      
      filename="guest-list.csv"
    />
  );
}
