import * as Yup from 'yup';

export const amenitySchema = Yup.object({
  name: Yup.string().required('Amenity name is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required')
});
