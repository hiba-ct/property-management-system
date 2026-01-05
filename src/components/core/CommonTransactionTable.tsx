import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef
} from '@tanstack/react-table';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack
} from '@mui/material';
import { Edit, Trash } from 'iconsax-reactjs';

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export default function CommonTransactionTable<T>({
  data,
  columns,
  onEdit,
  onDelete
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Table>
      <TableHead>
        {table.getHeaderGroups().map((hg) => (
          <TableRow key={hg.id}>
            {hg.headers.map((header) => (
              <TableCell key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableCell>
            ))}
            {(onEdit || onDelete) && <TableCell>Actions</TableCell>}
          </TableRow>
        ))}
      </TableHead>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
            {(onEdit || onDelete) && (
              <TableCell>
                <Stack direction="row" spacing={1}>
                  {onEdit && (
                    <IconButton onClick={() => onEdit(row.original)}>
                      <Edit size={18} />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton onClick={() => onDelete(row.original)}>
                      <Trash size={18} />
                    </IconButton>
                  )}
                </Stack>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
