import * as Yup from 'yup';

export const maintenanceRequestSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  priority: Yup.string().required('Priority is required'),
  roomNo: Yup.string().required('Room number is required')
});
