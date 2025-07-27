import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import Loading from '../../Component/Loading';
import EmployeeDashboard from './EmployeeDashboard';
import HRDashboard from './HRDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if(role === 'Employee'){
        return <EmployeeDashboard></EmployeeDashboard>
    }
    else if(role === 'HR'){
        return <HRDashboard></HRDashboard>
    }
    else {
        return <AdminDashboard></AdminDashboard>
    }
    // else {
    //     return <Forbidden></Forbidden>
    // }

};

export default DashboardHome;