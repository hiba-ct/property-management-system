import Page from 'components/Page';
import GuestForm from './Form';
import GuestList from './List';

export default function GuestPage() {
  return (
    <Page
      Form={GuestForm}
      List={GuestList}
      name="Guest"
    />
  );
}
