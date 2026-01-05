import { GRID_COMMON_SPACING, HEADER_HEIGHT } from 'config';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import MainCard from './MainCard';
import { Add, Book } from 'iconsax-reactjs';

interface IPage {
  Form: React.ElementType;
  List: React.ElementType;
  name: string;
  mode?: 'toggle' | 'split'; // toggle = Page style, split = Page style
  formWidth?: number;        // used in split mode
  listWidth?: number;        // used in split mode
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

  if (mode === 'toggle') {
    // --- Page style ---
    return (
      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid size={12}>
          <MainCard content={false} sx={{ overflow: 'visible' }}>
            <CardActions
              sx={{
                position: 'sticky',
                top: HEADER_HEIGHT,
                zIndex: 1,
                borderBottom: '1px solid',
                borderBottomColor: 'divider',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                marginBottom: -2
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 1
                }}
              >
                <Typography variant="h5" sx={{ m: 0, pl: 1.5 }}>
                  {showTable ? `${name} List` : `Add ${name}`}
                </Typography>
                <Stack direction="row" sx={{ gap: 1, px: 1.5, py: 0 }}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="small"
                    onClick={() => setShowTable(false)}
                  >
                    Create
                  </Button>
                  <Button
                    variant="contained"
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

  // --- Page style (split mode) ---
  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* Left side - Form */}
      <Grid size={{ xs: 12, lg: formWidth }}>
        <MainCard content={false} sx={{ overflow: 'visible' }}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid',
              borderBottomColor: 'divider',
              px: 2,
              py: 1.5,
              position: 'sticky',
              top: HEADER_HEIGHT,
              bgcolor: 'background.paper',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              zIndex: 1
            }}
          >
            <Typography variant="h5" sx={{ m: 0, pl: 1.5 }}>
              Add {name}
            </Typography>
          </Stack>
          <Divider />
          <div style={{ padding: 16 }}>
            <Form />
          </div>
        </MainCard>
      </Grid>

      {/* Right side - List */}
      <Grid size={{ xs: 12, lg: listWidth }}>
        <MainCard content={false} sx={{ overflow: 'visible' }}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid',
              borderBottomColor: 'divider',
              px: 2,
              py: 1.5,
              position: 'sticky',
              top: HEADER_HEIGHT,
              bgcolor: 'background.paper',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              zIndex: 1
            }}
          >
            <Typography variant="h5" sx={{ m: 0, pl: 1.5 }}>
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
