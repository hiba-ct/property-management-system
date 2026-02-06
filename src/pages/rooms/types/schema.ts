import * as Yup from 'yup';

export const roomTypeSchema = Yup.object({
  name: Yup.string().required('Room type name required'),
  code: Yup.string().required('Code required'),
  description: Yup.string(),
  price: Yup.number().required('Base rate required')
});
