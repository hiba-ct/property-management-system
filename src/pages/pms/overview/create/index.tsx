import Page from 'components/Page';
import AvailabilityForm from './Form';
import AvailabilityList from './List';

export default function AvailabilityPage() {
  return (
    <Page
      Form={AvailabilityForm}
      List={AvailabilityList}
      name="Availability Overview"
    />
  );
}
