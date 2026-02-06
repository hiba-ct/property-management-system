import * as Yup from 'yup';

export const roomSchema = Yup.object({
  number: Yup.string().required(),
  name: Yup.string().required(),
  type: Yup.string().required(),
  floor: Yup.number().required(),
  status: Yup.string().required()
});
