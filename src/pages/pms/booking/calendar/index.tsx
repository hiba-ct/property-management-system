import Page from 'components/Page';
import CalendarForm from './Form';
import CalendarList from './List';

export default function BookingCalendar() {
  return (
    <Page
      Form={CalendarForm}
      List={CalendarList}
      name="Booking Calendar"
      mode="split"
       formWidth={5}
      listWidth={7}
    />
  );
}
