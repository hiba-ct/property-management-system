import { Stack, Button, Box } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { CSVExport, DebouncedInput } from 'components/third-party/react-table';
import { Layer, Printer, DocumentDownload } from 'iconsax-reactjs';

interface TableToolbarProps<T> {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  data: T[];
  headers: { label: string; key: string }[];
  filename?: string;
  onColumnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TableToolbar<T>({
  globalFilter,
  setGlobalFilter,
  data,
  headers,
  filename = 'table-data.csv',
  onColumnClick
}: TableToolbarProps<T>) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: 2.5 }}
    >
      {/* 🔍 Search */}
      <DebouncedInput
        value={globalFilter ?? ''}
        onFilterChange={(value) => setGlobalFilter(String(value))}
        placeholder={`Search ${data.length} records...`}
        sx={{ minWidth: 220 }}
      />

      {/* 🔘 Actions */}
      <Stack direction="row" spacing={1}>
        <CSVExport data={data} headers={headers} filename={filename} />
        <IconButton>
          <DocumentDownload />
        </IconButton>
        <IconButton>
          <Printer />
        </IconButton>
        {onColumnClick && (
          <IconButton onClick={onColumnClick}>
            <Layer />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
}
