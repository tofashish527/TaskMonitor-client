import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosInstance = useAxios();
    const {
        data: role = 'Employee',
        isLoading: roleLoading,
        refetch,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get(`/user/${user.email}/role`);
            return res.data.role;
        },
    });

    return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;