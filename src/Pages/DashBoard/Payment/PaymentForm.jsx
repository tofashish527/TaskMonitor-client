import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useLocation, useNavigate} from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../../Hooks/useAxios';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance=useAxios();

  const {
    userId,
    name,
    email,
    salary,
    month,
    year
  } = location.state || {};
  const { payrollId } = location.state || {}; 

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
    const res = await axiosInstance.post('/create-payment-intent', {
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

  const paymentData = {
    empID: userId,
    email,
    amount: salary,
    transactionId,
    paymentMethod: result.paymentIntent.payment_method_types,
    salaryMonth: month,
    salaryYear: year
  };


  await axiosInstance.put(`/payroll/pay/${payrollId}`, paymentData);

  await Swal.fire({
    icon: 'success',
    title: 'Payment Successful!',
    html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
    confirmButtonText: 'Go to Payroll'
  });

  navigate('/dashboard/payroll');
}
    
  };

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Payment Processing</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Element */}
            <div className="bg-purple-900/50 border border-purple-600 rounded-xl p-4">
              <CardElement 
                options={{
                  style: {
                    base: {
                      color: 'white',
                      fontSize: '16px',
                      '::placeholder': {
                        color: '#a78bfa',
                      },
                    },
                  },
                }}
              />
            </div>

            {/* Employee Info */}
            <div className="bg-purple-900/30 border border-purple-600/50 rounded-xl p-4">
              <h3 className="text-purple-300 font-semibold mb-3">Employee Information</h3>
              <div className="text-purple-200 space-y-2 text-sm">
                <div><span className="font-medium">Name:</span> {name}</div>
                <div><span className="font-medium">Email:</span> {email}</div>
                <div><span className="font-medium">Salary:</span> <span className="text-green-400 font-semibold">${salary}</span></div>
                <div><span className="font-medium">Period:</span> {month} {year}</div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-600/50 rounded-xl p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-green-500 disabled:bg-green-600/50 disabled:cursor-not-allowed"
              disabled={!stripe}
            >
              Pay ${salary}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;