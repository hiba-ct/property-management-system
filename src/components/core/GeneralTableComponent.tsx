import { useMemo, useState } from 'react';
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  RowData,
  Table as TanstackTable,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';

// project imports
import { CSVExport, DebouncedInput, TablePagination } from 'components/third-party/react-table';
import IconButton from 'components/@extended/IconButton';
import { Edit2, Trash, Layer } from 'iconsax-reactjs';

/* ================= EDITABLE CELL ================= */

function EditableCell<T extends RowData>({
  getValue,
  row,
  column,
  table
}: {
  getValue: () => unknown;
  row: Row<T>;
  column: { id: string };
  table: TanstackTable<T>;
}) {
  const [value, setValue] = useState(String(getValue() ?? ''));

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      style={{
        width: '100%',
        padding: 6,
        border: '1px solid #ccc',
        borderRadius: 4
      }}
    />
  );
}

/* ================= PROPS ================= */

interface GeneralTableProps<T extends RowData> {
  data: T[];
  columns: ColumnDef<T>[];
  filename?: string;
}

/* ================= COMPONENT ================= */

export default function GeneralTableComponent<
  T extends object
>
({
  data: initialData,
  columns,
  filename = 'table-data.csv'
}: GeneralTableProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [editedRows, setEditedRows] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns: [
      ...columns,
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row, table }) => {
          const isEditing = editedRows[row.id];

          return (
            <Stack direction="row" spacing={1}>
              {isEditing ? (
                <Button
                  size="small"
                  variant="contained"
                  onClick={() =>
                    setEditedRows((p) => ({ ...p, [row.id]: false }))
                  }
                >
                  Save
                </Button>
              ) : (
                <IconButton
                  onClick={() =>
                    setEditedRows((p) => ({ ...p, [row.id]: true }))
                  }
                >
                  <Edit2 />
                </IconButton>
              )}

              <IconButton
                color="error"
                onClick={() => table.options.meta?.removeRow(row.index)}
              >
                <Trash />
              </IconButton>
            </Stack>
          );
        }
      }
    ],
    defaultColumn: {
      cell: ({ getValue, row, column, table }) => {
        if (!editedRows[row.id]) return getValue();
        return <EditableCell {...{ getValue, row, column, table }} />;
      }
    },
    state: {
      globalFilter,
      rowSelection,
      columnVisibility
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, i) =>
            i === rowIndex ? ({ ...row, [columnId]: value } as T) : row
          )
        );
      },
      removeRow: (rowIndex) => {
        setData((old) => old.filter((_, i) => i !== rowIndex));
      }
    }
  });

  const headers = useMemo(
    () =>
      columns
        .filter(
          (c): c is ColumnDef<T> & { accessorKey: string } =>
            'accessorKey' in c && typeof c.accessorKey === 'string'
        )
        .map((c) => ({
          label: String(c.header),
          key: c.accessorKey
        })),
    [columns]
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      {/* SEARCH + EXPORT */}
      <Stack direction="row" justifyContent="space-between" sx={{ p: 2,mt:2 }}>
        <DebouncedInput
          value={globalFilter}
          onFilterChange={(v) => setGlobalFilter(String(v))}
          placeholder={`Search ${data.length} records...`}
          sx={{ width: 220 }}
        />

        <Stack direction="row" spacing={1}>
          <CSVExport data={data} headers={headers} filename={filename} />
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Layer />
          </IconButton>
        </Stack>
      </Stack>

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

      <Divider />
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
