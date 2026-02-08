import Page from 'components/Page';

import MaintenanceIssueList from './List';
import MaintenanceIssueForm from './Form';

export default function MaintenanceIssuesPage() {
  return (
    <Page
      Form={MaintenanceIssueForm}
      List={MaintenanceIssueList}
      name="Maintenance Issues"
    />
  );
}
