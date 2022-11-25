import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { AiOutlineHome } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="drawer drawer-mobile bg-slate-100">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* <!-- Page content here --> */}
                    <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content bg-slate-200">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link><AiOutlineHome className='text-2xl'/>Dashboard Home</Link></li>
                        <li><Link><BsBagCheck className='text-2xl'/>My Orders</Link></li>
                        <li><Link><FaClipboardList className='text-2xl'/>My Wishlist</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;