import Page from 'components/Page';
import BookingDetailsForm from './Form';
import BookingDetailsList from './List';

export default function BookingDetailsPage() {
  return (
    <Page
      Form={BookingDetailsForm}
      List={BookingDetailsList}
      name="Booking Details"
      mode="toggle"
    />
  );
}
