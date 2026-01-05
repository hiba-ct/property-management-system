
import BookingForm from './Form';
import Page from 'components/Page.tsx';
import BookingList from './List';


export default function BookingPage() {
  return (
    <Page
      Form={BookingForm}
      List={BookingList}
      name="Booking"
      /*  mode="toggle"     // optional (default)
      formWidth={4}
      listWidth={8}  */
    />
  );
}
