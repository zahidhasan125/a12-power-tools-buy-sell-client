import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { AiOutlineHome } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdReportGmailerrorred } from "react-icons/md";
import { FaClipboardList, FaUsers } from "react-icons/fa";
import { FcList, FcAddDatabase } from "react-icons/fc";
import { AuthContext } from '../../contexts/AuthProvider';
import useSeller from '../../hooks/useSeller';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email);
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div>
            <Navbar />
            <div className="drawer drawer-mobile bg-slate-200">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col bg-slate-100">
                    <Outlet />
                </div>
                <div className="drawer-side bg-black">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-72 text-white">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to="/dashboard"><AiOutlineHome className='text-2xl' />Dashboard Home</Link></li>

                        {

                            !isAdmin && !isSeller &&

                            <>
                                <li><Link to="/dashboard/myorders"><BsBagCheck className='text-2xl' />My Orders</Link></li>
                                <li><Link to="/dashboard/mywishlist"><FaClipboardList className='text-2xl' />My Wishlist</Link></li>
                            </>
                        }
                        {
                            isSeller &&
                            <>
                                <li><Link to="/dashboard/addproduct"><FcAddDatabase className='text-2xl' />Add Product</Link></li>
                                <li><Link to="/dashboard/myproducts"><FcList className='text-2xl' />My Products</Link></li>
                                <li><Link to="/dashboard/mybuyers"><FaUsers className='text-2xl' />My Buyers</Link></li>

                            </>
                        }
                        {
                            isAdmin &&

                            <>
                                <li><Link to="/dashboard/allsellers"><HiOutlineUserGroup className='text-2xl' />All Sellers</Link></li>
                                <li><Link to="/dashboard/allbuyers"><FaUsers className='text-2xl' />All Buyers</Link></li>
                                <li><Link to="/dashboard/reporteditems"><MdReportGmailerrorred className='text-2xl' />Reported Items</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;