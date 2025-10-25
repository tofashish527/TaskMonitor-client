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

  if (isLoading) return (
    <div className="min-h-screen bg-purple-300 py-8 px-4 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">Visitor Messages</h2>
            <p className="text-purple-200">Messages from website visitors and users</p>
          </div>

          {messages.length === 0 ? (
            <div className="text-center p-8 text-purple-200">
              <p className="text-lg">No messages found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="relative p-6 bg-purple-700/30 border border-purple-600/50 rounded-xl backdrop-blur-sm hover:bg-purple-700/40 transition-all duration-300"
                >
                  {/* Date at top right */}
                  <p className="absolute top-4 right-6 text-xs font-bold text-purple-300">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>

                  {/* Name & Email */}
                  <div className="mb-3">
                    <h4 className="font-semibold text-lg text-white">{msg.name}</h4>
                    <p className="text-sm text-purple-200">Email: {msg.email}</p>
                  </div>

                  {/* Message */}
                  <p className="text-white mt-2 leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;