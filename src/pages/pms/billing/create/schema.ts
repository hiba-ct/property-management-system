import * as Yup from 'yup';

export const paymentSchema = Yup.object({
  amount: Yup.number().required('Amount is required'),
  paymentDate: Yup.string().required('Payment date is required'),
  paymentMode: Yup.string().required('Payment mode is required'),
  referenceNo: Yup.string(),
  remarks: Yup.string()
});
