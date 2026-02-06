import { GRID_COMMON_SPACING, HEADER_HEIGHT } from 'config';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import MainCard from './MainCard';
import { Add, Book } from 'iconsax-reactjs';

interface IPage {
  Form: React.ElementType;
  List: React.ElementType;
  name: string;
  mode?: 'toggle' | 'split';
  formWidth?: number;
  listWidth?: number;
}

const Page = ({
  Form,
  List,
  name,
  mode = 'toggle',
  formWidth = 4,
  listWidth = 8
}: IPage) => {
  const [showTable, setShowTable] = useState(false);
  const theme = useTheme();

  // ✅ Reusable header style
  const headerSX = {
    position: 'sticky',
    top: HEADER_HEIGHT,
    zIndex: 1,
    backgroundColor: theme.palette.primary.darker,
    color: theme.palette.primary.contrastText,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: '0 2px 6px rgba(25, 16, 17, 0.08)'
  };

  const headerContentSX = {
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 2,
    py: 1.5
  };

  if (mode === 'toggle') {
    return (
      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid size={12}>
          <MainCard content={false} sx={{ overflow: 'visible' }}>
            <CardActions sx={headerSX}>
              <Stack direction="row" sx={{ ...headerContentSX, width: 1 }}>
                <Typography variant="h5" fontWeight={600}>
                  {showTable ? `${name} List` : `Add ${name}`}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Add />}
                    size="small"
                    onClick={() => setShowTable(false)}
                  >
                    Create
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Book />}
                    size="small"
                    onClick={() => setShowTable(true)}
                  >
                    List
                  </Button>
                </Stack>
              </Stack>
            </CardActions>

            {showTable ? <List /> : <Form />}
          </MainCard>
        </Grid>
      </Grid>
    );
  }

  // --- Split Mode ---
  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* Form */}
      <Grid size={{ xs: 12, lg: formWidth }}>
        <MainCard content={false} sx={{ overflow: 'visible' }}>
          <Stack direction="row" sx={{ ...headerSX, ...headerContentSX }}>
            <Typography variant="h5" fontWeight={600}>
              Add {name}
            </Typography>
          </Stack>
          <Divider />
          <div style={{ padding: 16 }}>
            <Form />
          </div>
        </MainCard>
      </Grid>

      {/* List */}
      <Grid size={{ xs: 12, lg: listWidth }}>
        <MainCard content={false} sx={{ overflow: 'visible' }}>
          <Stack direction="row" sx={{ ...headerSX, ...headerContentSX }}>
            <Typography variant="h5" fontWeight={600}>
              {name} List
            </Typography>
          </Stack>
          <Divider />
          <div style={{ padding: 16 }}>
            <List />
          </div>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Page;
