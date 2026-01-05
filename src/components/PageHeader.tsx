import { Stack, Typography, Box } from '@mui/material';

interface PageHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h4" fontWeight={600}>
        {title}
      </Typography>

      {action && <Box>{action}</Box>}
    </Stack>
  );
}
