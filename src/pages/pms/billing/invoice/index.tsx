import Page from 'components/Page';
import InvoiceForm from './Form';
import InvoiceList from './List';

export default function InvoicePage() {
  return (
    <Page
      Form={InvoiceForm}
      List={InvoiceList}
      name="Invoice"
    />
  );
}
