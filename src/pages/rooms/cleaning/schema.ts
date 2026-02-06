import * as Yup from 'yup';

export const cleaningSchema = Yup.object({
  room: Yup.string().required('Room is required'),
  status: Yup.string().required('Status is required'),
  lastCleaned: Yup.string().required('Last cleaned date is required'),
  assigned: Yup.string().required('Assigned staff is required')
});
