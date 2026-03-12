

import UserList from './List';
import UserForm from './Form'
import Page from 'components/Page';

export default function Ledger() {
  return (
    <Page 
        Form={UserForm}
        List={UserList}
        name='Ledger'
       mode='split'
          formWidth={5}
      listWidth={7} 
        />
    )
}

