import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// components
import CardSetupForm from './components/card-setup-form';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardSetupForm />
    </Elements>
  );
};

export default App;
