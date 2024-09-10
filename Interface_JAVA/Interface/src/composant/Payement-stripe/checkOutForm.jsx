import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { message, Input, Button, Flex } from 'antd';
import axios from 'axios';

const CheckoutForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                name: name,
            },
        });

        if (error) {
            console.error(error.message);
            message.error('Une erreur est survenue lors du paiement.');
            return;
        }

        try {
            const { id } = paymentMethod;
            const response = await axios.post('http://localhost:1000/api/payments/confirm-payment', {
                paymentIntentId: clientSecret,
                paymentMethodId: id,
            });

            if (response.data.success) {
                message.success('Paiement effectué avec succès!');
            } else {
                message.error('Erreur lors de la confirmation du paiement.');
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            message.error('Une erreur est survenue lors de la confirmation du paiement.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="contentInput">
                <div className="container">
                    <Flex vertical gap={30}>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Nom du patient"
                            variant="filled"
                        />
                        <CardElement />
                        <Button type='primary' htmlType="submit" disabled={!stripe}>
                            Payer maintenant
                        </Button>
                    </Flex>
                </div>
            </div>
        </form>
    );
};

export default CheckoutForm;
