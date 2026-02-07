import Page from 'components/Page';
import AddPaymentForm from './Form';
import PaymentList from './List';


export default function BillingPage() {
  return (
    <Page
      Form={AddPaymentForm}
      List={PaymentList}
      name="Billing & Payments"
    />
  );
}
