import { useMemo, useState } from 'react';
import {
  Box,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton
} from '@mui/material';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';

import { Eye, Edit, Trash, Layer } from 'iconsax-reactjs';

// project imports
import { CSVExport, DebouncedInput, TablePagination } from 'components/third-party/react-table';

/* ================= PROPS ================= */

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  filename?: string;

  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;

  meta?: {
    extraContent?: React.ReactNode;
  };
}

/* ================= COMPONENT ================= */

export default function GenericTable<T>({
  data,
  columns,
  filename = 'table.csv',
  onView,
  onEdit,
  onDelete,
  meta
}: GenericTableProps<T>) {

  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /* ================= ACTION COLUMN ================= */

  const enhancedColumns: ColumnDef<T>[] = useMemo(() => {

    if (!onView && !onEdit && !onDelete) return columns;

    return [
      ...columns,
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Stack direction="row" spacing={1}>

            {onView && (
              <IconButton onClick={() => onView(row.original)}>
                <Eye size={18} />
              </IconButton>
            )}

            {onEdit && (
              <IconButton onClick={() => onEdit(row.original)}>
                <Edit size={18} />
              </IconButton>
            )}

            {onDelete && (
              <IconButton color="error" onClick={() => onDelete(row.original)}>
                <Trash size={18} />
              </IconButton>
            )}

          </Stack>
        )
      }
    ];

  }, [columns, onView, onEdit, onDelete]);

  /* ================= TABLE ================= */

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: {
      globalFilter,
      columnVisibility
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  /* ================= CSV HEADERS ================= */

  const headers = useMemo(
    () =>
      enhancedColumns
        .filter((c): c is ColumnDef<T> & { accessorKey: string } => 'accessorKey' in c)
        .map((c) => ({
          label: String(c.header),
          key: c.accessorKey
        })),
    [enhancedColumns]
  );

  /* ================= RENDER ================= */

  return (
    <>
      {/* SEARCH + EXPORT + COLUMN TOGGLE */}

      <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
        <DebouncedInput
          value={globalFilter}
          onFilterChange={(v) => setGlobalFilter(String(v))}
          placeholder={`Search ${data.length} records...`}
          sx={{ width: 220 }}
        />

        <Stack direction="row" spacing={1}>
          <CSVExport data={data} headers={headers} filename={filename} />

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Layer size={18} />
          </IconButton>
        </Stack>
      </Stack>

      {/* COLUMN VISIBILITY MENU */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {table.getAllLeafColumns().map((column) => (
          <MenuItem key={column.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
              }
              label={String(column.columnDef.header)}
            />
          </MenuItem>
        ))}
      </Menu>

      {/* TABLE */}

      <TableContainer component={Paper}>
        <Table size="small">

          <TableHead sx={{ bgcolor: 'primary.main' }}>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableCell key={header.id} sx={{ color: '#fff' }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
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
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* EXTRA CONTENT */}

      {meta?.extraContent && (
        <Box sx={{ px: 2, py: 2 }}>
          {meta.extraContent}
        </Box>
      )}

      <Divider />

      {/* PAGINATION */}

      <Box sx={{ p: 2 }}>
        <TablePagination
          setPageSize={table.setPageSize}
          setPageIndex={table.setPageIndex}
          getState={table.getState}
          getPageCount={table.getPageCount}
        />
      </Box>
    </>
  );
}