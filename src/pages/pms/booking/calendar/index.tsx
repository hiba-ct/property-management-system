import Page from 'components/Page';

import CalendarList from './List';

export default function BookingCalendar() {
  return (
    <Page
      Form={CalendarList}
      List={CalendarList}
      name="Booking Calendar"
      viewOnly   // ⭐ This hides Create / List buttons
      mode="toggle"
      formWidth={5}
      listWidth={7}
    />
  );
}
