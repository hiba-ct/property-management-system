import Page from 'components/Page';


import GuestDetails from './GuestDetails';

export default function GuestDetailsPage() {
  return (
    <Page
      Form={GuestDetails}
      List={GuestDetails}
      name="Guest Profile"
    />
  );
}
