import Page from 'components/Page';
import CleaningForm from './Form';
import CleaningList from './List';

export default function RoomsCleaningPage() {
  return (
    <Page
      Form={CleaningForm}
      List={CleaningList}
      name="Room Cleaning Status"
      mode="split"
       formWidth={5}
      listWidth={7}
    />
  );
}
