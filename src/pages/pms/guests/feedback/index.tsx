
import Page from 'components/Page';

import GuestFeedbackForm from './Form';
import FeedbackList from './List';




export default function GuestFeedback() {
  return (
    <Page
      Form={GuestFeedbackForm}
      List={FeedbackList}
      name="Guest Feedback"
        mode="toggle"     // optional (default)
      
    />
  );
}
