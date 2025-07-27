import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';



const ITEMS_PER_PAGE = 5;

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosInstance = useAxiosSecure();
    const [page, setPage] = useState(0);

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/payments/${user.email}`);
            // Sort by oldest first (ascending)
            return res.data.sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at));
        }
    });

    if (isPending) {
        return '...loading';
    }

    const paginated = payments.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
    const totalPages = Math.ceil(payments.length / ITEMS_PER_PAGE);

    return (
        <div className="overflow-x-auto shadow-md rounded-xl">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Employee Email</th>
                        <th>Month, Year</th>
                        <th>Amount</th>
                        <th>Transaction ID</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.length > 0 ? (
                        paginated.map((payment, index) => (
                            <tr key={payment.transactionId}>
                                <td>{page * ITEMS_PER_PAGE + index + 1}</td>
                                <td>{user.email}</td>
                                <td>{payment.salaryMonth} {payment.salaryYear}</td>
                                <td>৳{payment.salary}</td>
                                <td className="font-mono text-sm">
                                    <span title={payment.transactionId}>
                                        {payment.transactionId}...
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center text-gray-500 py-6">
                                No payment history found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        className="btn btn-sm"
                        disabled={page === 0}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Prev
                    </button>
                    <span className="text-sm mt-1">
                        Page {page + 1} of {totalPages}
                    </span>
                    <button
                        className="btn btn-sm"
                        disabled={page === totalPages - 1}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
