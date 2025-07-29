import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';

const AdminMessages = () => {
  const axiosInstance = useAxios();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['adminMessages'],
    queryFn: async () => {
      const res = await axiosInstance.get('/messages');
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center py-10">Loading messages...</p>;

  return (
    <section className="max-w-5xl px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">Visitor Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="relative p-6 border rounded-xl bg-white shadow-md"
            >
              {/* Date at top right */}
              <p className="absolute top-4 right-6 text-xs font-bold text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </p>

              {/* Name & Email */}
              <div className="mb-2">
                <h4 className="font-semibold text-lg">{msg.name}</h4>
                <p className="text-sm text-gray-600">Email: {msg.email}</p>
              </div>

              {/* Message */}
              <p className="text-gray-800 mt-2">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminMessages;
