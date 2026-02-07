import * as Yup from 'yup';

export const invoiceSchema = Yup.object({
  bookingRef: Yup.string().required('Booking reference is required'),
  guestName: Yup.string().required('Guest name is required'),
  amount: Yup.number().required('Amount is required').positive(),
  issueDate: Yup.string().required('Issue date is required'),
  dueDate: Yup.string().required('Due date is required'),
  status: Yup.string().required('Status is required')
});
