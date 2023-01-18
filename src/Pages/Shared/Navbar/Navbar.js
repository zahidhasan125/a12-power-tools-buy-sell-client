import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../BuySell.png'
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
        <li className='hover:bg-blue-800 rounded-lg'><Link to="/">Home</Link></li>
        <li className='hover:bg-blue-800 rounded-lg dropdown'>
            <span tabIndex={0}>
                Category
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </span>
            <ul tabIndex={0} className="font-bold p-2 bg-primary shadow rounded-box z-50 w-52">
                {
                    categories.map(category => <li key={category._id} className='hover:bg-blue-800 rounded-lg'><Link to={`/category/${category._id}`}>{category.name}</Link></li>)
                }
            </ul>
        </li>
        <li className='hover:bg-blue-800 rounded-lg'><Link to="/blogs">Blogs</Link></li>
        <li className='hover:bg-blue-800 rounded-lg dropdown'>
            <span tabIndex={0}>
                Pages
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </span>
            <ul tabIndex={0} className="font-bold p-2 bg-primary shadow rounded-box z-50 w-52">
                <li className='hover:bg-blue-800 rounded-lg'><a target="_blank" href="https://mdzahidhasan-portfolio.web.app/" rel="noreferrer">About Me</a></li>
                <li className='hover:bg-blue-800 rounded-lg'><Link to="/404">404 Page</Link></li>
                <li className='hover:bg-blue-800 rounded-lg'><a target="_blank" href="https://mdzahidhasan-portfolio.web.app/" rel="noreferrer">Contact Me</a></li>
            </ul>
        </li>
        {user ?
            <>
                <li className='hover:bg-blue-800 rounded-lg'><Link to="/dashboard">Dashboard</Link></li>
                <li onClick={handleSignOut} className='hover:bg-blue-800 rounded-lg btn btn-outline text-white ml-1'><Link >Sign Out</Link></li>
            </>
            :
            <li className='hover:bg-blue-800 rounded-lg btn btn-outline text-white ml-1 animate-pulse'><Link to="/login">Login</Link></li>
        }
    </>
    return (
        <div className="navbar bg-primary text-white justify-between">
            <div className="navbar-start">
                <div className="navbar-end lg:hidden">
                    <div className="dropdown dropdown-start ">
                        <label tabIndex={1} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact font-bold dropdown-content mt-3 p-2 bg-primary shadow rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                </div>

                <Link to="/" className="btn btn-ghost normal-case text-xl"><img className='w-36 bg-slate-600 px-2 rounded-xl' src={logo} alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal font-bold p-0">
                    {menuItems}
                </ul>
            </div>
            {
                user &&
                <div className="navbar-end lg:hidden">
                    <div className="dropdown">
                        <label tabIndex={0} htmlFor="dashboard-drawer" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                </div>
            }

        </div>
    );
};

export default Navbar;