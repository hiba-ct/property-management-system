import { useParams } from 'react-router-dom';

export default function BookingDetailsPage() {
  const { id } = useParams();
  return <div>Booking Details : {id}</div>;
}
