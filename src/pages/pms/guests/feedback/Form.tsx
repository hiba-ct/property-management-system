import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import { feedbackSchema } from './schema';

const options = ['Excellent', 'Good', 'Average', 'Poor'];

export default function GuestFeedbackForm() {
  const formik = useFormik({
    initialValues: {
      overall: '',
      cleanliness: '',
      staff: '',
      food: '',
      comfort: '',
      comments: ''
    },
    validationSchema: feedbackSchema,
    onSubmit: (values) => {
      console.log('Feedback Submitted:', values);
    }
  });

  const renderRadio = (name: string, label: string) => (
    <Grid size={12}>
      <Typography fontWeight={600}>{label}</Typography>
      <RadioGroup
        row
        name={name}
        value={formik.values[name as keyof typeof formik.values]}
        onChange={formik.handleChange}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt}
            value={opt}
            control={<Radio />}
            label={opt}
          />
        ))}
      </RadioGroup>
    </Grid>
  );

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          {/* HEADER INFO */}
          <Typography variant="h6">Guest Feedback</Typography>
          <Typography color="text.secondary">
            Guest: John Doe | Room: 204 | Stay: 12–15 Aug 2025
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            {renderRadio('overall', '1. Overall Experience')}
            {renderRadio('cleanliness', '2. Cleanliness')}
            {renderRadio('staff', '3. Staff Service')}
            {renderRadio('food', '4. Food & Dining')}
            {renderRadio('comfort', '5. Comfort & Amenities')}

            <Grid size={12}>
              <Typography fontWeight={600}>Comments / Suggestions</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="comments"
                value={formik.values.comments}
                onChange={formik.handleChange}
                placeholder="Write your feedback..."
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center' }}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              Submit Feedback
            </Button>
            <Button variant="outlined" onClick={() => formik.resetForm()}>
              Cancel
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
}
