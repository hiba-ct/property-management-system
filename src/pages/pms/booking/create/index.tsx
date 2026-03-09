
import Page from 'components/Page';


import BookingCreateForm from './Form';
import BookingTable from './List';



export default function BookingPage() {
  return (
    <Page
      Form={BookingCreateForm}
      List={BookingTable}
      name="Booking"
 
      /*  mode="toggle"     // optional (default)
      formWidth={4}
      listWidth={8}  */
    />
  );
}
