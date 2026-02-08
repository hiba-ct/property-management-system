import * as Yup from 'yup';

export const availabilitySchema = Yup.object({
  fromDate: Yup.string().required('From date is required'),
  toDate: Yup.string().required('To date is required'),
  roomType: Yup.string(),
  status: Yup.string(),
  occupancy: Yup.string()
});
