import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h2 className='text-4xl font-bold text-center mt-8'>Hello <span className='text-primary'>{user?.displayName || user?.email}</span>!</h2>
            <h3 className='text-3xl font-bold text-center mt-8'>Welcome to your Dashboard!</h3>
        </div>
    );
};

export default DashboardHome;