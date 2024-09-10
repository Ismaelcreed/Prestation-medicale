import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkOutForm';
import axios from 'axios';

const stripePromise = loadStripe('https://js.stripe.com/v3/');


const Payment = () => {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const response = await axios.post('http://localhost:1000/api/payments/create-payment-intent', {
                    currency: 'usd',
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
            }
        };

        getClientSecret();
    }, []);

    const options = {
        clientSecret: clientSecret,
    };

    return (
        clientSecret && (
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm clientSecret={clientSecret} />
            </Elements>
        )
    );
};

export default Payment;
