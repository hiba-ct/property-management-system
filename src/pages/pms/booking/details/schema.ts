import * as Yup from 'yup';

export const bookingDetailsSchema = Yup.object({
  guestName: Yup.string().required('Guest name required'),
  email: Yup.string().email().required('Email required'),
  mobile: Yup.string().required('Mobile required'),
  address: Yup.string().required('Address required'),

  checkIn: Yup.string().required('Check-in required'),
  checkOut: Yup.string().required('Check-out required'),
  status: Yup.string().required('Status required'),
  source: Yup.string().required('Source required'),

  roomType: Yup.string().required('Room type required'),
  roomNo: Yup.string().required('Room number required'),
  guests: Yup.string().required('Guests required'),

  rate: Yup.number().required('Rate required'),
  nights: Yup.number().required('Nights required'),

  totalAmount: Yup.number().required(),
  paid: Yup.number().required(),
  paymentMode: Yup.string().required(),
  paymentStatus: Yup.string().required()
});
