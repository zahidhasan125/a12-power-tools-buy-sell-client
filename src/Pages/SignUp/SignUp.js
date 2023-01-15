import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const googleProvider = new GoogleAuthProvider();

const SignUp = () => {
    const { createUser, providerLogin, updateUserInfo, logOut } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState("");
    const [signUpUserEmail, setSignUpUserEmail] = useState('');
    const [token] = useToken(signUpUserEmail);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true })
    }

    const handleSignUp = data => {
        setSignUpError("")
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = { displayName: data.name }
                const usrInfo = {
                    name: data.name,
                    email: data.email,
                    userType: data.userType

                }
                setSignUpUserEmail(data.email);
                saveUserToDb(usrInfo);
                updateUserInfo(userInfo)
                    .then(() => {
                        console.log('User Updated');
                        setSignUpError("");

                    })
                    .catch(err => {
                        setSignUpError(err.message);
                        return;
                    })
            })
            .catch(err => {
                setSignUpError(err.message);
            })
    }

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(() => { })
            .catch(err => {
                setSignUpError(err.message)
            })
    }

    const saveUserToDb = (usrInfo) => {
        const user = { usrInfo }
        fetch(`${process.env.REACT_APP_dnsName}/users`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('buy-sell-power-tools-token')}`
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('User Created Successfully!');
                    logOut().then(() => { }).catch(() => { })
                    navigate('/login')
                }
            })
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='w-96 p-6 dark:bg-slate-800 rounded-xl'>
                <h2 className='text-xl font-bold text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full dark:text-black">
                        <label className="label"><span className="label-text dark:text-white">Name</span></label>
                        <input type="text" {...register('name', { required: "Name is required." })} className="input input-sm input-bordered w-full" />
                        {errors.name && <p className='text-red-700 font-bold pt-2'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full dark:text-black">
                        <label className="label"><span className="label-text dark:text-white">Email</span></label>
                        <input type="email" {...register('email', { required: "Email is required." })} className="input input-sm input-bordered w-full" />
                        {errors.email && <p className='text-red-700 font-bold pt-2'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full dark:text-black">
                        <label className="label"><span className="label-text dark:text-white">Select User Type</span></label>
                        <select className="select select-sm select-bordered w-full" {...register('userType', { required: "Email is required." })}>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                        {errors.email && <p className='text-red-700 font-bold pt-2'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full dark:text-black">
                        <label className="label"><span className="label-text dark:text-white">Password</span></label>
                        <input type="password" {...register('password', { required: "Password is required.", minLength: { value: 6, message: 'Password must be at least 6 characters or longer.' }, pattern: { value: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/, message: "Password is weak. (At Least 1 UpperCase, LowerCase, Digit & Special Character Required.)" } })} className="input input-sm input-bordered w-full" />
                        {errors.password && <p className='text-red-700 font-bold pt-2'>{errors.password?.message}</p>}
                        {signUpError && <p className='text-red-700 font-bold'>{signUpError?.split('/')[1].slice(0, -2)}</p>}
                    </div>

                    <input className="btn btn-sm w-full my-6 text-white bg-primary" type='submit' value='Sign Up' />
                </form>
                <p>Already have an account? <Link to='/login' className='text-primary'>Please Login</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary btn-sm w-full dark:text-white'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;