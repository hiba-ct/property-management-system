
import * as yup from 'yup';

export const validationSchemaUserType = yup.object({
  username: yup.string().required('User Name Is Reqiured'),
  userType: yup.string().required('User Type Is Reqiured'),
});