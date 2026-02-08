import Page from 'components/Page';
import MaintenanceRequestForm from './Form';
import MaintenanceRequestList from './List';

export default function MaintenanceRequestsPage() {
  return (
    <Page
      Form={MaintenanceRequestForm}
      List={MaintenanceRequestList}
      name="Maintenance Requests"
    />
  );
}
