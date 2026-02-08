import Page from 'components/Page';
import AmenityForm from './Form';
import AmenityList from './List';

export default function AmenitiesPage() {
  return (
    <Page
      Form={AmenityForm}
      List={AmenityList}
      name="Amenities Management"
    />
  );
}
