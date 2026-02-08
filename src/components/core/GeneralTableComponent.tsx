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
  FormControlLabel
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

// project imports
import { CSVExport, DebouncedInput, TablePagination } from 'components/third-party/react-table';
import IconButton from 'components/@extended/IconButton';
import { Layer } from 'iconsax-reactjs';

/* ================= PROPS ================= */

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  filename?: string;
  meta?: {
    extraContent?: React.ReactNode; // ✅ legend / summary slot
  };
}

/* ================= COMPONENT ================= */

export default function GenericTable<T>({
  data,
  columns,
  filename = 'table.csv',
  meta
}: GenericTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const table = useReactTable({
    data,
    columns,
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

  const headers = useMemo(
    () =>
      columns
        .filter((c): c is ColumnDef<T> & { accessorKey: string } => 'accessorKey' in c)
        .map((c) => ({
          label: String(c.header),
          key: c.accessorKey
        })),
    [columns]
  );

  /* ================= RENDER ================= */

  return (
    <>
      {/* ================= SEARCH + EXPORT + LAYER ================= */}
      <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
        <DebouncedInput
          value={globalFilter}
          onFilterChange={(v) => setGlobalFilter(String(v))}
          placeholder={`Search ${data.length} records...`}
          sx={{ width: 220 }}
        />

        <Stack direction="row" spacing={1}>
          <CSVExport data={data} headers={headers} filename={filename} />

          {/* COLUMN VISIBILITY */}
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Layer />
          </IconButton>
        </Stack>
      </Stack>

      {/* ================= COLUMN VISIBILITY MENU ================= */}
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

      {/* ================= TABLE ================= */}
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

      {/* ================= EXTRA CONTENT (LEGEND) ================= */}
      {meta?.extraContent && (
        <Box sx={{ px: 2, py: 2 }}>
          {meta.extraContent}
        </Box>
      )}

      <Divider />

      {/* ================= PAGINATION ================= */}
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
