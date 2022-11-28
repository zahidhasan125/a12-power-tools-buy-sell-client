import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { FcPaid } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data: orderItems = [], refetch, isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://buy-sell-used-power-tools-server.vercel.app/orders?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('buy-sell-power-tools-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading />;
    }


    const handleDeleteProduct = id => {
        fetch(`https://buy-sell-used-power-tools-server.vercel.app/orders/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('buy-sell-power-tools-token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    toast.success('Item successfully deleted!', { duration: 6000 })
                }
            })
    }

    const closeModal = () => {
        setSelectedProduct(null)
    }

    return (
        <div className='my-8'>
            <h3 className='text-3xl font-bold text-center mb-8'>My Orders</h3>
            <div className="overflow-x-auto px-2">
                <table className="table w-full">
                    <thead>
                        <tr className='text-center'>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderItems.map((product, idx) => <tr key={product._id} className="hover text-center">
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-16 rounded">
                                            <img src={product.img} alt="ProductImage" />
                                        </div>
                                    </div>
                                </td>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td>
                                    {
                                        product.price && !product.paid &&

                                        <Link to={`/dashboard/payment/${product._id}`}>
                                            <label
                                                // onClick={() => setSelectedProduct(product)}
                                                className='bg-primary p-2 rounded-xl tooltip mr-1'
                                                data-tip="Pay Now"
                                                htmlFor="edit-product-info-modal"
                                            >
                                                <AiOutlineDollarCircle className='text-white' />
                                            </label>
                                        </Link>
                                    }
                                    {
                                        product.price && product.paid &&
                                        <label
                                            data-tip="Paid"
                                            className='bg-success p-2 rounded-xl tooltip mr-1'
                                        >
                                            <FcPaid />
                                        </label>
                                    }
                                    <label
                                        onClick={() => setSelectedProduct(product)}
                                        className='bg-error p-2 rounded-xl tooltip mr-1'
                                        data-tip="Remove"
                                        htmlFor="confirmation-modal"
                                    >
                                        <FaTrashAlt className='text-white' />
                                    </label>

                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            {
                selectedProduct &&
                <ConfirmationModal
                    title={`Are You Sure?`}
                    message={`Do you want to Permanently delete ${selectedProduct?.name}?`}
                    successAction={handleDeleteProduct}
                    successButtonName="Delete"
                    modalData={selectedProduct}
                    closeModal={closeModal}
                >
                </ConfirmationModal>

            }
        </div>
    );
};

export default MyOrders;