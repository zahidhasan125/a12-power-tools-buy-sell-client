import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { FcPaid } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const MyWishList = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user } = useContext(AuthContext);

    const { data: myWishListItems = [], refetch, isLoading } = useQuery({
        queryKey: ['mywishtlist', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/mywishtlist?email=${user?.email}`, {
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
    const closeModal = () => {
        setSelectedProduct(null)
    }
    const handleDeleteProduct = id => {
        console.log(id);
    }
    return (
        <div className='my-8'>
            <h3 className='text-3xl font-bold text-center mb-8'>My Wishlist</h3>
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
                            myWishListItems.map((product, idx) => <tr key={product._id} className="hover text-center">
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-16 rounded">
                                            <img src={product.img} alt="ProductImage" />
                                        </div>
                                    </div>
                                </td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
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
                    message={`Do you want to delete ${selectedProduct?.name} from wishlist?`}
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

export default MyWishList;