import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../Hooks/useAxios';

const ITEMS_PER_PAGE = 5;

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [page, setPage] = useState(0);

    const { isPending, error, data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/payments/${user.email}`);
            // Sort by newest first (descending)
            return res.data.sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at));
        },
        enabled: !!user?.email
    });

    // Calculate pagination data
    const totalPages = Math.ceil(payments.length / ITEMS_PER_PAGE);
    const paginatedPayments = payments.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

    if (isPending) {
        return (
            <div className="min-h-screen bg-purple-300 py-8 px-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-purple-300 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-600/50 shadow-2xl text-center">
                        <p className="text-red-600 font-medium text-lg">Error loading payment history</p>
                        <p className="text-red-500 text-sm mt-2">Please try again later</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-purple-300 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-white mb-2">Payment History</h2>
                        <p className="text-purple-200">Your transaction records and payment details</p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-purple-700/50 border-b border-purple-600/50">
                                    <th className="p-3 text-left text-white font-semibold">#</th>
                                    <th className="p-3 text-left text-white font-semibold">Employee Email</th>
                                    <th className="p-3 text-left text-white font-semibold">Month, Year</th>
                                    <th className="p-3 text-left text-white font-semibold">Amount</th>
                                    <th className="p-3 text-left text-white font-semibold">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPayments.length > 0 ? (
                                    paginatedPayments.map((payment, index) => (
                                        <tr 
                                            key={payment.transactionId} 
                                            className="border-b border-purple-600/30 hover:bg-purple-700/20 transition-colors duration-200"
                                        >
                                            <td className="p-3 text-white font-medium">
                                                {page * ITEMS_PER_PAGE + index + 1}
                                            </td>
                                            <td className="p-3 text-purple-200">
                                                {user.email}
                                            </td>
                                            <td className="p-3 text-white">
                                                {payment.salaryMonth} {payment.salaryYear}
                                            </td>
                                            <td className="p-3 text-purple-300 font-semibold">
                                                ৳{payment.salary}
                                            </td>
                                            <td className="p-3">
                                                <span 
                                                    title={payment.transactionId}
                                                    className="text-purple-200 font-mono text-sm bg-purple-900/30 px-2 py-1 rounded-lg"
                                                >
                                                    {payment.transactionId?.slice(0, 20)}...
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center p-8">
                                            <div className="text-purple-200">
                                                <svg className="mx-auto h-16 w-16 text-purple-300/60 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-lg font-medium text-white">No payment history found</p>
                                                <p className="text-sm mt-1">Your payment records will appear here</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-6 pt-6 border-t border-purple-600/30">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-purple-200 text-sm">
                                    Showing <span className="font-semibold text-white">{paginatedPayments.length}</span> of{' '}
                                    <span className="font-semibold text-white">{payments.length}</span> payments
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                                        disabled={page === 0}
                                        className="px-4 py-2 bg-purple-700/50 border border-purple-600 rounded-lg text-white hover:bg-purple-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        Previous
                                    </button>
                                    
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i)}
                                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                    page === i
                                                        ? 'bg-purple-600 text-white shadow-lg'
                                                        : 'text-purple-200 hover:bg-purple-700/30'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
                                        disabled={page === totalPages - 1}
                                        className="px-4 py-2 bg-purple-700/50 border border-purple-600 rounded-lg text-white hover:bg-purple-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;