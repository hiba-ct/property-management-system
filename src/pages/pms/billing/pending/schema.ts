import * as Yup from 'yup';

export const pendingPaymentSchema = Yup.object({
  bookingId: Yup.string().required('Booking ID is required'),
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive'),
  paymentMode: Yup.string().required('Payment mode is required'),
  paymentDate: Yup.string().required('Payment date is required'),
  reference: Yup.string()
});
