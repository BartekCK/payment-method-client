import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// components
import CardSection from '../card-section';

// styles
import './styles.css';

const CardSetupForm = () => {
  const [clientSecret, setClientSecret] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    try {
      setLoading(true);
      await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment--form">
      <label htmlFor="clientSecret" className="client--secret-label">
        Client secret
        <input
          className="client--secret-input"
          type="text"
          id="clientSecret"
          value={clientSecret}
          onChange={(event) => setClientSecret(event.target.value)}
        />
      </label>
      <CardSection />
      <button disabled={!stripe} className="payment--btn">
        {isLoading ? 'Loading ...' : 'Save Card'}
      </button>
    </form>
  );
};

export default CardSetupForm;
