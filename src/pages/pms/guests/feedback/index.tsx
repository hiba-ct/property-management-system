
import Page from 'components/Page';


import FeedbackList from './List';






export default function GuestFeedback() {
  return (
    <Page
      List={FeedbackList}
     
      name="Guest Feedback"
      viewOnly
       
     
    />
  );
}
