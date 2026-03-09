import Page from 'components/Page';

import AvailabilityList from './List';

export default function AvailabilityPage() {
  return (
    <Page
     
      List={AvailabilityList}
      name="Availability Overview"
      viewOnly
    />
  );
}
