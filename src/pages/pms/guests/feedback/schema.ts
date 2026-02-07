import * as Yup from 'yup';

export const feedbackSchema = Yup.object({
  overall: Yup.string().required('Required'),
  cleanliness: Yup.string().required('Required'),
  staff: Yup.string().required('Required'),
  food: Yup.string().required('Required'),
  comfort: Yup.string().required('Required'),
  comments: Yup.string().max(500, 'Too long')
});
