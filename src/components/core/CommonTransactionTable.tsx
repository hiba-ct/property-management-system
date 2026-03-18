import { useState, useMemo, useRef } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Box,
  Divider,
  Button,
  Tooltip
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef
} from '@tanstack/react-table';

import {
  CSVExport,
  DebouncedInput,
  TablePagination
} from 'components/third-party/react-table';

import IconButton from 'components/@extended/IconButton';
import { Edit2, Trash, Printer, DocumentDownload } from 'iconsax-reactjs';

import { useReactToPrint } from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ExportPDFView from 'sections/apps/invoice/export-pdf';

/* ================= TYPES ================= */

interface Props<T> {
  data: T[];
  setData?: React.Dispatch<React.SetStateAction<T[]>>;
  columns: ColumnDef<T>[];
  filename?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

/* ================= COMPONENT ================= */

export default function CommonTransactionTable<T>({
  data,
  setData,
  columns,
  filename = 'export.csv',
  onEdit,
  onDelete
}: Props<T>) {

  const theme = useTheme(); // 🔥 theme usage
  const [globalFilter, setGlobalFilter] = useState('');
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef
  });

  /* ================= ACTION COLUMN ================= */

  const enhancedColumns: ColumnDef<T>[] = useMemo(() => [
    ...columns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <Stack direction="row" spacing={1}>

            {onEdit && (
              <Tooltip title="Edit">
                <IconButton
                  sx={{ color: theme.palette.primary.main }}
                  onClick={() => onEdit(rowData)}
                >
                  <Edit2 size={18} />
                </IconButton>
              </Tooltip>
            )}

            {onDelete && (
              <Tooltip title="Delete">
                <IconButton
                  sx={{ color: theme.palette.error.main }}
                  onClick={() => onDelete(rowData)}
                >
                  <Trash size={18} />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Print">
              <IconButton onClick={() => window.print()}>
                <Printer size={18} />
              </IconButton>
            </Tooltip>

          </Stack>
        );
      }
    }
  ], [columns, onEdit, onDelete, theme]);

  /* ================= TABLE ================= */

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  /* ================= CSV HEADERS ================= */

  const headers = useMemo(
    () =>
      enhancedColumns
        .filter((c: any) => c.accessorKey)
        .map((c: any) => ({
          label: c.header,
          key: c.accessorKey
        })),
    [enhancedColumns]
  );

  /* ================= UI ================= */

  return (
    <>
      {/* 🔍 TOOLBAR */}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2 }}
      >

        {/* Search */}
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
          sx={{ minWidth: 250 }}
        />

        {/* Actions */}
        <Stack direction="row" spacing={1}>

          <CSVExport data={data} headers={headers} filename={filename} />

          <PDFDownloadLink
            document={<ExportPDFView list={data as any} />}
            fileName={`${filename}.pdf`}
          >
            <Button
              variant="contained"
              startIcon={<DocumentDownload />}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                borderRadius: '8px',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark
                }
              }}
            >
              Download
            </Button>
          </PDFDownloadLink>

          <Button
            variant="outlined"
            startIcon={<Printer />}
            onClick={handlePrint}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              borderRadius: '8px',
              '&:hover': {
                bgcolor: theme.palette.primary.main,
                color: '#fff'
              }
            }}
          >
            Print
          </Button>

        </Stack>
      </Stack>

      {/* 📊 TABLE */}

      <TableContainer
        component={Paper}
        ref={contentRef}
        sx={{ maxHeight: 'calc(100vh - 330px)' }}
      >
        <Table size="small">

          {/* 🔥 MAROON HEADER */}
          <TableHead
            sx={{
              bgcolor: theme.palette.primary.main,
              '& th': {
                color: '#fff',
                fontWeight: 600,
                borderRight: '1px solid rgba(255,255,255,0.2)'
              }
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          {/* BODY */}
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

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