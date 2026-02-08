import Page from 'components/Page';
import HousekeepingForm from './Form';
import HousekeepingList from './List';

export default function HousekeepingPage() {
  return (
    <Page
      Form={HousekeepingForm}
      List={HousekeepingList}
      name="Housekeeping Management"
    />
  );
}
