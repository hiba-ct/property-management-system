import Page from 'components/Page';
import PendingPaymentForm from './Form';
import PendingPaymentList from './List';

export default function PendingPaymentPage() {
  return (
    <Page
      Form={PendingPaymentForm}
      List={PendingPaymentList}
      name="Pending Payment"
    />
  );
}
