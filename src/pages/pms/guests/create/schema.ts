import * as Yup from 'yup';

export const guestSchema = Yup.object({
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  gender: Yup.string().required('Gender required'),
  dob: Yup.string().required('Date of birth required'),
  phone: Yup.string().required('Phone number required'),
  email: Yup.string().email('Invalid email'),
  idType: Yup.string().required('ID type required'),
  idNumber: Yup.string().required('ID number required'),
  address1: Yup.string().required('Address required'),
  city: Yup.string().required('City required'),
  country: Yup.string().required('Country required'),
  nationality: Yup.string().required('Nationality required')
});
