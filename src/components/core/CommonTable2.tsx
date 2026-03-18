import { FC, useState, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
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
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  Row,
  Table as TanstackTable
} from '@tanstack/react-table';
import type { RowData } from '@tanstack/table-core';
import 'assets/third-party/react-table.css'; // ✅ Imported CSS for sticky header

// project imports
import { CSVExport, DebouncedInput, HeaderSort, IndeterminateCheckbox, TablePagination } from 'components/third-party/react-table';
import IconButton from 'components/@extended/IconButton';
import { Edit2, Trash, Printer, DocumentDownload } from 'iconsax-reactjs';

// react-to-print
import { useReactToPrint } from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ExportPDFView from 'sections/apps/invoice/export-pdf';


// ========================================================
declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
    removeRow?: (rowIndex: number) => void;
  }
}
// ==============================|| Editable Cell ||============================== //
const EditableCell: FC<{ getValue: () => any; row: Row<any>; column: { id: string }; table: TanstackTable<any> }> = ({
  getValue,
  row,
  column,
  table
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const onBlur = () => table.options.meta?.updateData(row.index, column.id, value);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      style={{ width: '100%', padding: '6px', border: 'none', backgroundColor: 'transparent', boxSizing: 'border-box' }}
    />
  );
};

// ==============================|| Common Table ||============================== //
interface CommonTableProps<TData extends RowData> {
  data: TData[];
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  columns: ColumnDef<TData>[];
  filename?: string;
}

export default function CommonTable2<TData extends RowData>({ data, setData, columns, filename = 'export.csv' }: CommonTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [editedRows, setEditedRows] = useState<{ [key: string]: boolean }>({});
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();

  // print ref
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // Extend columns with actions
  const enhancedColumns = useMemo<ColumnDef<TData>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      ...columns,
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row, table }) => {
          const isEditing = editedRows[row.id];
          const rowData = row.original as any;

          const handleEditClick = () => {
            if (type) {
              navigate(`/accounts/transactions/payment/${type}/edit/${rowData.id}`);
            }
          };

          const handleDeleteClick = () => {
            table.options.meta?.removeRow(row.index);
          };

          const handlePrintRow = () => {
            console.log('Print row details:', rowData);
            window.print(); 
          };

          return (
            <Stack direction="row" spacing={1}>
              <Tooltip title="Edit">
                <IconButton onClick={handleEditClick}>
                  <Edit2 />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleDeleteClick} color="error">
                  <Trash />
                </IconButton>
              </Tooltip>
              <Tooltip title="Print Row">
                <IconButton onClick={handlePrintRow}>
                  <Printer />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    [columns, editedRows, type, navigate]
  );

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    defaultColumn: {
      cell: ({ getValue, row, column, table }) => {
        const isEditing = editedRows[row.id];
        return isEditing ? <EditableCell {...{ getValue, row, column, table }} /> : getValue();
      }
    },
    state: { rowSelection, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setData((old) => old.map((row, index) => (index === rowIndex ? { ...old[rowIndex]!, [columnId]: value } : row)));
      },
      removeRow: (rowIndex: number) => {
        setData((old) => old.filter((_, index) => index !== rowIndex));
      }
    }
  });

  // Export headers
  const headers = useMemo(
    () =>
      enhancedColumns
        .filter(
          (c): c is ColumnDef<TData> & { accessorKey: string } =>
            'accessorKey' in c && typeof c.accessorKey === 'string' && c.header !== '#'
        )
        .map((c) => ({ label: typeof c.header === 'string' ? c.header : (c.id ?? ''), key: c.accessorKey })),
    [enhancedColumns]
  );

  return (
    <>
      {/* Top Bar - ✅ Reduced Padding and Height to match reference */}
      <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={0} sx={{ p: 1, pt: 3 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
          sx={{height: 35}} // ✅ Matches reference
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <CSVExport
            data={
              table.getSelectedRowModel().flatRows.map((row) => row.original).length
                ? table.getSelectedRowModel().flatRows.map((row) => row.original)
                : data
            }
            headers={headers}
            filename={filename}
          />

          <PDFDownloadLink document={<ExportPDFView list={data as any} />} fileName={`${type}-list.pdf`}>
            <Button variant="contained" color="primary" startIcon={<DocumentDownload />}>
              Download
            </Button>
          </PDFDownloadLink>

          <Button variant="outlined" color="secondary" startIcon={<Printer />} onClick={reactToPrintFn}>
            Print
          </Button>
        </Stack>
      </Stack>

      {/* Table - ✅ Added Max Height and Sticky Header logic */}
      <TableContainer component={Paper} ref={contentRef} sx={{ maxHeight: 'calc(100vh - 330px)' }}>
        <Table size="small"> {/* ✅ Added size="small" */}
          <TableHead className="sticky-header"> {/* ✅ Added sticky-header class */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    // ✅ Added Sort Logic & Styling to Header Cells
                    if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                        Object.assign(header.column.columnDef.meta, {
                          className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                        });
                      }

                    return (
                  <TableCell 
                    key={header.id}
                    {...header.column.columnDef.meta}
                    onClick={header.column.getToggleSortingHandler()} // ✅ Added Click Handler for Sorting
                    {...(header.column.getCanSort() &&
                        header.column.columnDef.meta === undefined && {
                          className: 'cursor-pointer prevent-select'
                    })}
                  >
                    {header.isPlaceholder ? null : (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                        {header.column.getCanSort() && <HeaderSort column={header.column} sort />}
                      </Stack>
                    )}
                  </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell 
                    key={cell.id}
                    // ✅ Added Padding and Height reduction for Body Cells
                    sx={{ 
                        padding: '3px 6px', 
                        height: '10px' 
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination - ✅ Reduced Padding */}
      <Divider />
      <Box sx={{ p: 0 }}>
        <TablePagination
          {...{
            setPageSize: table.setPageSize,
            setPageIndex: table.setPageIndex,
            getState: table.getState,
            getPageCount: table.getPageCount
          }}
        />
      </Box>
    </>
  );
}