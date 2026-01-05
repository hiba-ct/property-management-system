import { Stack, Button } from '@mui/material';
import { Add } from 'iconsax-reactjs';

interface Props {
  onCreate?: () => void;
  createLabel?: string;
}

export default function PageActions({
  onCreate,
  createLabel = 'Create'
}: Props) {
  return (
    <Stack direction="row" spacing={1}>
      {onCreate && (
        <Button
          variant="contained"
          startIcon={<Add size={18} />}
          onClick={onCreate}
        >
          {createLabel}
        </Button>
      )}
    </Stack>
  );
}
