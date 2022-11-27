import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const googleProvider = new GoogleAuthProvider()

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
    const [token] = useToken(loggedInUserEmail);
    const { userLogin, providerLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    if (token) {
        navigate(from, {replace: true})
    }

    const handleLogin = data => {
        setLoginError('')
        userLogin(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoggedInUserEmail(data.email)
            })
            .catch(err => {
                setLoginError(err.message)
            })
    }
    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => { })
            .catch(err => {
                setLoginError(err.message)
            })
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='w-96 p-6 dark:bg-slate-800 rounded-xl'>
                <h2 className='text-xl font-bold text-center'>LOGIN</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full dark:text-black ">
                        <label className="label"><span className="label-text dark:text-white">Email</span></label>
                        <input type="email" {...register("email", { required: 'Email is required.' })} className="input input-sm input-bordered w-full" />
                        {errors.email && <p className='text-red-700'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full dark:text-black">
                        <label className="label"><span className="label-text dark:text-white">Password</span></label>
                        <input type="password" {...register("password", { required: 'Password is required.', minLength: { value: 6, message: 'Password must be at least 6 character or longer.' } })} className="input input-sm input-bordered w-full" />
                        {errors.password && <p className='text-red-700'>{errors.password?.message}</p>}
                        <Link to="/forget"><label className="label"><span className="label-text dark:text-white cursor-pointer">Forget password?</span></label></Link>
                    </div>
                    {loginError && <p className='text-red-700 font-bold'>{loginError?.split('/')[1].slice(0, -2)}</p>}
                    <input className="btn btn-sm w-full my-2 bg-primary text-white" type='submit' value='Login' />
                </form>
                <p>New to Doctors Portal? <Link to='/sign-up' className='text-primary'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary btn-sm w-full dark:text-white'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;