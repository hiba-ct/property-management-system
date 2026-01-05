import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  renderRow?: (row: any) => React.ReactNode; // ✅ ADD THIS
}

export default function DataTable({
  columns,
  rows,
  renderRow
}: DataTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key}>
                <strong>{col.label}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) =>
              renderRow ? (
                // ✅ CUSTOM ROW RENDER
                renderRow(row)
              ) : (
                // ✅ DEFAULT ROW RENDER
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
