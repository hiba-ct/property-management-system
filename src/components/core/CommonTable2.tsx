import React, { FC, useState, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

import 'assets/third-party/react-table.css';

import {
  CSVExport,
  DebouncedInput,
  IndeterminateCheckbox,
  TablePagination
} from 'components/third-party/react-table';

import IconButton from 'components/@extended/IconButton';
import { Edit2, Trash, Printer, DocumentDownload } from 'iconsax-reactjs';

import { useReactToPrint } from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ExportPDFView from 'sections/apps/invoice/export-pdf';

/* ================= TYPES ================= */
interface CommonTableProps<T> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  columns: ColumnDef<T>[];
  filename?: string;
}

/* ================= EDITABLE CELL ================= */
const EditableCell: FC<any> = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData?.(row.index, column.id, value);
  };

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      style={{
        width: '100%',
        padding: '4px',
        border: 'none',
        backgroundColor: 'transparent'
      }}
    />
  );
};

/* ================= MAIN COMPONENT ================= */
export default function CommonTable2<T>({
  data,
  setData,
  columns,
  filename = 'export.csv'
}: CommonTableProps<T>) {

  const theme = useTheme();
  const navigate = useNavigate();
  const { type } = useParams();

  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
  contentRef
});

  /* ================= COLUMNS ================= */
  const enhancedColumns = useMemo<ColumnDef<T>[]>(() => [
    {
      id: 'select',
      header: ({ table }: any) => (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }: any) => (
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      )
    },

    ...columns,

    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row, table }: any) => {
        const rowData = row.original;

        return (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Edit">
              <IconButton onClick={() => navigate(`/edit/${rowData.id}`)}>
                <Edit2 size={16} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => table.options.meta?.removeRow?.(row.index)}
              >
                <Trash size={16} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Print">
              <IconButton onClick={reactToPrintFn}>
                <Printer size={16} />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      }
    }

  ], [columns, navigate, reactToPrintFn]);

  /* ================= TABLE ================= */
  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: { rowSelection, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,

    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setData((old: any[]) =>
          old.map((row: any, index: number) =>
            index === rowIndex ? { ...row, [columnId]: value } : row
          )
        );
      },

      removeRow: (rowIndex: number) => {
        setData((old: any[]) =>
          old.filter((_: any, i: number) => i !== rowIndex)
        );
      }
    }
  });

  /* ================= UI ================= */
  return (
    <>
      {/* 🔍 TOP BAR */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2 }}
      >

        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
          sx={{ minWidth: 250 }}
        />

        <Stack direction="row" spacing={1}>
          <CSVExport data={data} filename={filename} />

          <PDFDownloadLink document={<ExportPDFView list={data} />} fileName="list.pdf">
            <Button variant="contained" startIcon={<DocumentDownload />}>
              Download
            </Button>
          </PDFDownloadLink>

          <Button variant="outlined" startIcon={<Printer />} onClick={reactToPrintFn}>
            Print
          </Button>
        </Stack>
      </Stack>

      {/* 📊 TABLE */}
      <TableContainer component={Paper} ref={contentRef}>
        <Table size="small">

          {/* 🔥 HEADER STYLE */}
          <TableHead
            sx={{
              backgroundColor: theme.palette.primary.main,
              '& th': {
                color: '#fff',
                fontWeight: 600,
                fontSize: '12px',
                padding: '6px 10px',
                lineHeight: 1.2
              }
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          {/* 🔥 BODY */}
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '& td': {
                    padding: '6px 10px'
                  }
                }}
              >
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

      {/* PAGINATION */}
      <Divider />
      <Box>
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