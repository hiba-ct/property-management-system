import * as Yup from 'yup';


export const validationSchemaUserType = Yup.object({
      guestName: Yup.string().required('Guest Name is required'),
      mobile: Yup.string().required('Mobile number is required'),
      checkIn: Yup.string().required('Check-in date is required'),
      checkOut: Yup.string().required('Check-out date is required'),
      roomType: Yup.string().required('Room type is required'),
      roomNo: Yup.string().required('Room number is required'),
      paymentMode: Yup.string().required('Payment mode is required')
    });
    
   