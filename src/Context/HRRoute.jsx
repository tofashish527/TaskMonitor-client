
import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';

const HRRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'HR') {
        return <Navigate state={{ from: location.pathname }} to="/"></Navigate>
    }

    return children;
};

export default HRRoute;