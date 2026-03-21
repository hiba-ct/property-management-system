import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { Add, Book } from "iconsax-reactjs";
import MainCard from "components/MainCard";
import { useTheme } from "@mui/material/styles";
import { HEADER_HEIGHT } from "config";

const Payment = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();

  const isList = pathname.includes("list");

  // 🔥 DYNAMIC NAME
  const pageName =
    type === "DN"
      ? "Debit Note"
      : type === "CN"
      ? "Credit Note"
      : type === "JV"
      ? "Journal Voucher"
      : type === "PR"
      ? "Payment Reciept"
      :"Payment";
      

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <MainCard content={false} sx={{ overflow: "visible" }}>

          {/* 🔥 HEADER */}
          <CardActions
            sx={{
              position: "sticky",
              top: HEADER_HEIGHT,
              zIndex: 1,
              bgcolor: theme.palette.primary.darker,
              color: theme.palette.primary.contrastText,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={1}
              px={1}
              py={1}
            >

              {/* TITLE */}
              <Typography variant="h5" fontWeight={600}>
                {isList ? `${pageName} List` : `Add ${pageName}`}
              </Typography>

              {/* ACTION BUTTONS */}
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Add />}
                  onClick={() => navigate("create")}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark
                    }
                  }}
                >
                  Create
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Book />}
                  onClick={() => navigate("list")}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark
                    }
                  }}
                >
                  List
                </Button>
              </Stack>

            </Stack>
          </CardActions>

          {/* CONTENT */}
         <Outlet key={type} context={{ type }} />

        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Payment;