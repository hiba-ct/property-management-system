import { useFormik, FormikProvider } from "formik";
import { initialValues } from "./helper";
import Header from "./Header";
import Content from "./Content";
import { CardContent, CardActions, Stack, Button } from "@mui/material";
import { Eraser, SaveAdd } from "iconsax-reactjs";

export default function Form() {

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>

        <CardContent>
          <Header formik={formik} />
          <Content formik={formik} />
        </CardContent>

        <CardActions>
          <Stack direction="row" justifyContent="center" spacing={1} width={1}>
            <Button
              color="error"
              startIcon={<Eraser />}
              onClick={() => formik.resetForm()}
            >
              Clear
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveAdd />}
            >
              Save
            </Button>
          </Stack>
        </CardActions>

      </form>
    </FormikProvider>
  );
}