


import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user_id } = useParams();
    console.log('user_id:', user_id);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
const { month, year } = location.state || {};

    const [error, setError] = useState('');


    const { isPending, data: salaryInfo = {} } = useQuery({
        queryKey: ['user', user?.email?.toLowerCase()],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/email/${user.email.toLowerCase()}`);
            return res.data;
        }
    })

    if (isPending) {
        return '...loading'
    }

    console.log(salaryInfo)
    const amount = salaryInfo.salary;
    const account=salaryInfo.bank_account_no;
    const email=salaryInfo.email;
    const name=salaryInfo.name;
    const designation=salaryInfo.designation;
    const role=salaryInfo.role;
    console.log(amount,account);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        // step- 1: validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
            console.log('payment method', paymentMethod);

            // step-2: create payment intent
            // const res = await axiosSecure.post('/create-payment-intent', {
            //     amount,
            //     user_id
            // })
            const res = await axiosSecure.post('/create-payment-intent', {
  amount: Math.round(amount *100), // convert to cents
  user_id
});  

            const clientSecret = res.data.clientSecret;

            // step-3: confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    const transactionId = result.paymentIntent.id;
                    // step-4 mark parcel paid also create payment history
                    const paymentData = {
                        empID: user_id,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types,
                         salaryMonth: month,
                         salaryYear: year,
                    }

                    const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if (paymentRes.data.insertedId) {

                        // ✅ Show SweetAlert with transaction ID
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Employeelist',
                        });


                    // ✅ Redirect to /myParcels
                    navigate('/dashboard/employeelist');

                }
            }
        }
    }





}

return (
    <div>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 mt-10 rounded-xl shadow-md w-full max-w-md mx-auto">
            <CardElement className="p-2 border rounded"/>
            <div className='text-black'>
                <span className='text-lime-700 text-xl font-bold'>Employee Info : </span><br></br>
                Name : {name}<br></br>
                Email : {email}<br></br>
                Designation : {designation}<br></br>
                Role : {role}
            </div>
            <button
                type='submit'
                className="btn btn-primary text-white w-full"
                disabled={!stripe}
            >
                Pay ${amount}
            </button>
            {
                error && <p className='text-red-500'>{error}</p>
            }
        </form>
    </div>
);
};

export default PaymentForm;