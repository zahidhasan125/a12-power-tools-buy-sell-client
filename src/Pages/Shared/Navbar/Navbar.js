import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../BuySell.png'

const Navbar = () => {
    const menuItems = <>
        <li className='hover:bg-blue-800 rounded-lg'><Link to="/">Home</Link></li>
        <li className='hover:bg-blue-800 rounded-lg' tabIndex={0}>
            <span>
                Category
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </span>
            <ul className="p-1 bg-primary z-10 rounded-b-lg">
                <li className='hover:bg-blue-800 rounded-lg'><Link to="/">Drill</Link></li>
                <li className='hover:bg-blue-800 rounded-lg'><Link to="/">Screwdriver</Link></li>
                <li className='hover:bg-blue-800 rounded-lg'><Link to="/">Jigsaw</Link></li>
                <li className='hover:bg-blue-800 rounded-lg'><Link to="/">Disc Sander</Link></li>
                <li className='hover:bg-blue-800 rounded-lg'><Link to="/">Angle Grinder</Link></li>
            </ul>
        </li>
        <li className='hover:bg-blue-800 rounded-lg'><Link to="/">Blogs</Link></li>
        <li className='hover:bg-blue-800 rounded-lg btn btn-outline text-white ml-1 animate-pulse'><Link to="/login">Login</Link></li>
    </>
    return (
        <div className="navbar bg-primary text-white justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact font-bold dropdown-content mt-3 p-2 bg-primary shadow rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl"><img className='w-36 bg-slate-600 px-2 rounded-xl' src={logo} alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal font-bold p-0">
                    {menuItems}
                </ul>
            </div>

        </div>
    );
};

export default Navbar;