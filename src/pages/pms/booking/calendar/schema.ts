import * as Yup from 'yup';

export const calendarSchema = Yup.object({
  bookingId: Yup.string().required('Booking ID is required'),
  date: Yup.string().required('Date is required'),
  status: Yup.string().required('Status is required')
});
