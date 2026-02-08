import * as Yup from 'yup';

export const maintenanceIssueSchema = Yup.object({
  room: Yup.string().required('Room number is required'),
  description: Yup.string().required('Issue description is required'),
  priority: Yup.string().required('Priority is required'),
  status: Yup.string().required('Status is required'),
  assignedTo: Yup.string()
});
