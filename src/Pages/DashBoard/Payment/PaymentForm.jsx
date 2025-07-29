import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useLocation, useNavigate} from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get employee data from location.state
  const {
    userId,
    name,
    email,
    salary,
    month,
    year
  } = location.state || {};

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Step 1: Create Payment Method
    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    setError('');
    console.log('payment method', paymentMethod);

    // Step 2: Create payment intent
    const res = await axiosSecure.post('/create-payment-intent', {
      amount: Math.round(salary * 100),
      user_id: userId
    });

    const clientSecret = res.data.clientSecret;

    // Step 3: Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name,
          email
        }
      }
    });

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (result.paymentIntent.status === 'succeeded') {
      const transactionId = result.paymentIntent.id;

      // Step 4: Send payment record to backend
      const paymentData = {
        empID: userId,
        email,
        amount: salary,
        transactionId,
        paymentMethod: result.paymentIntent.payment_method_types,
        salaryMonth: month,
        salaryYear: year
      };

      const paymentRes = await axiosSecure.post('/payments', paymentData);
      if (paymentRes.data.insertedId) {
        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
          confirmButtonText: 'Go to Payroll'
        });

        navigate('/dashboard/payroll');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 mt-10 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <CardElement className="p-2 border rounded" />
      <div className="text-black">
        <span className="text-lime-700 text-xl font-bold">Employee Info:</span>
        <br />
        Name: {name} <br />
        Email: {email} <br />
        Salary: ${salary} <br />
        Month: {month} <br />
        Year: {year}
      </div>
      <button
        type="submit"
        className="btn btn-primary text-white w-full"
        disabled={!stripe}
      >
        Pay ${salary}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;

