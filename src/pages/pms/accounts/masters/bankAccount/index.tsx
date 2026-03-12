 import UserTable from './List'; 
 import UserForm from './Form'
 import Page from 'components/Page';
 
 export default function index() {
   return (
     <Page 
         Form={UserForm}
         List={UserTable}
         name='Bank Account'
         mode="split"     
         formWidth={5}   
         listWidth={7} 
         />
     )
 }
 
 