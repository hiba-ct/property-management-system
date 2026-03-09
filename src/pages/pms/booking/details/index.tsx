import Page from 'components/Page';
import BookingTable from './List';


export default function BookingDetailsPage() {
  return (
    <Page
      
      List={BookingTable}
      name="Booking Details"
      viewOnly
      mode="toggle"
    />
  );
}
