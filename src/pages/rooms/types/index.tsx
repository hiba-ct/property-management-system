import Page from 'components/Page';
import RoomTypeForm from './Form';
import RoomTypeList from './List';

export default function RoomTypesPage() {
  return (
    <Page
      Form={RoomTypeForm}
      List={RoomTypeList}
      name="Room Type"
      mode="toggle"
    />
  );
}
