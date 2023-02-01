import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Recruiter = () => {

    const { userLogin } = useContext(AuthContext);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
    const [token] = useToken(loggedInUserEmail);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    if (token) {
        navigate(from, { replace: true })
    }

    const handleRecruiterSeller = () => {
        userLogin(process.env.REACT_APP_rsEmail, process.env.REACT_APP_rsPass)
            .then(result => {
                setLoggedInUserEmail(process.env.REACT_APP_rsEmail);
                toast.success('Welcome Recruiter!!')
             })
            .catch(err => {
                console.error(err);
             })
    }
    const handleRecruiterBuyer = () => {
        userLogin(process.env.REACT_APP_rbEmail, process.env.REACT_APP_rbPass)
            .then(result => {
                setLoggedInUserEmail(process.env.REACT_APP_rbEmail);
                toast.success('Welcome Recruiter!!')
             })
            .catch(err => {
                console.error(err);
             })
    }
    const handleRecruiterAdmin = () => {
        userLogin(process.env.REACT_APP_raEmail, process.env.REACT_APP_raPass)
            .then(result => { 
                setLoggedInUserEmail(process.env.REACT_APP_raEmail);
                toast.success('Welcome Recruiter!!')
            })
            .catch(err => {
                console.error(err);
             })
    }
    return (
        <div className='max-w-screen-md bg-slate-200 mx-auto flex flex-col gap-4 justify-center items-center my-10 p-10'>
            <h2 className='text-4xl md:text-6xl lg:text-7xl font-bold '>Welcome Recruiter</h2>
            <p className='text-lg font-semibold'>Please select any option from below </p>
            <small>Passwordless Login</small>
            <button onClick={handleRecruiterBuyer} className='btn btn-primary btn-outline md-w-1/4'>Buyer Login</button>
            <button onClick={handleRecruiterSeller} className='btn btn-primary btn-outline md-w-1/4'>Seller Login</button>
            <button onClick={handleRecruiterAdmin} className='btn btn-primary btn-outline md-w-1/4'>Admin Login</button>
        </div>
    );
};

export default Recruiter;