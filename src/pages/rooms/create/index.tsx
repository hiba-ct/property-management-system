import Page from 'components/Page';
import RoomForm from './Form';
import RoomList from './List';

export default function RoomsPage() {
  return (
  <Page 
  Form={RoomForm} 
  List={RoomList} 
  name="Rooms" />
  );
}
