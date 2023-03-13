import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../logo.png'
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        logOut().then(() => { }).catch(() => { });
    }
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_dnsName}/category`)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])


    const menuItems = <>
        <li className='rounded-lg'><Link to="/">Home</Link></li>
        <li className='rounded-lg dropdown'>
            <span tabIndex={0}>
                Category
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </span>
            <ul tabIndex={0} className="font-bold p-2 bg-primary rounded-box z-50 w-36">
                {
                    categories.map(category => <li key={category._id} className='rounded-lg border mb-1'><Link to={`/category/${category._id}`}>{category.name}</Link></li>)
                }
            </ul>
        </li>
        <li className='rounded-lg'><Link to="/blogs">Blogs</Link></li>
        <li className='rounded-lg dropdown'>
            <span tabIndex={0}>
                Pages
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </span>
            <ul tabIndex={0} className="font-bold p-2 bg-primary shadow rounded-box z-50 w-36">
                <li className='rounded-lg mb-1 border'><a target="_blank" href="https://mdzahidhasan-portfolio.web.app/" rel="noreferrer">About Me</a></li>
                <li className='rounded-lg mb-1 border'><Link to="/404">404 Page</Link></li>
                <li className='rounded-lg mb-1 border'><a target="_blank" href="https://mdzahidhasan-portfolio.web.app/" rel="noreferrer">Contact Me</a></li>
            </ul>
        </li>
        {
            user && <li className='rounded-lg'><Link to="/dashboard">Dashboard</Link></li>
        }

    </>
    return (
        <div className="navbar bg-primary text-black justify-between sticky top-0 z-30">
            <div className="navbar-start">
                <div className="navbar-end lg:hidden">
                    <div className="dropdown dropdown-start ">
                        <label tabIndex={1} className="btn btn-ghost btn-sm lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact font-bold dropdown-content mt-3 p-2 bg-primary rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                </div>

                <Link to="/" className="btn btn-primary normal-case hover:scale-110 px-0 ml-4"><img className='h-full' src={logo} alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal font-bold p-0 items-center text-md">
                    {menuItems}
                </ul>
            </div>
            {
                <div>
                    {user ?
                        <>
                            
                            <li onClick={handleSignOut} className='rounded-lg btn btn-outline hover:bg-cyan-600 text-white ml-1 hover:animate-pulse text-center'><Link >Sign Out</Link></li>
                        </>
                        :
                        <>
                            <li className='rounded-lg btn btn-outline hover:bg-cyan-600 text-white ml-1 hover:animate-pulse text-center'><Link to="/login">Login</Link></li>
                            {/* <li className='rounded-lg btn btn-outline btn-sm text-white ml-1 animate-pulse'><Link to="/recruiter">Recruiter Login</Link></li> */}
                        </>
                    }
                </div>
            }
            {
                user &&
                <div className="navbar-end lg:hidden w-auto">
                    <div className="dropdown">
                        <label tabIndex={0} htmlFor="dashboard-drawer" className="btn btn-ghost btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                </div>
            }

        </div>
    );
};

export default Navbar;