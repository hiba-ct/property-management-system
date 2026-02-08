import * as Yup from 'yup';

export const housekeepingSchema = Yup.object({
  roomNo: Yup.string().required('Room number is required'),
  roomType: Yup.string().required('Room type is required'),
  task: Yup.string().required('Task description is required'),
  assignedTo: Yup.string().required('Staff is required'),
  priority: Yup.string().required('Priority is required'),
  dueDate: Yup.string().required('Due date is required'),
  notes: Yup.string()
});
