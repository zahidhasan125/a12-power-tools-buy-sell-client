import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaAdversal, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [selectedProduct, setSelectedProduct] = useState(null)
    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['myproduct', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myproduct?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loading />
    }
    const handleDeleteProduct = id => {
        fetch(`http://localhost:5000/myproduct/${id}`, {
            method: "DELETE",
            headers: {
                authorization: ``
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    toast.success('Item successfully deleted!')                    
                }
        })
    }
    const closeModal = () => {
        setSelectedProduct(null)
    }
    return (
        <div className='my-8'>
            <h3 className='text-3xl font-bold text-center mb-8'>My Products</h3>
            <div className="overflow-x-auto px-2">
                <table className="table w-full">
                    <thead>
                        <tr className='text-center'>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Added On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts.map((product, idx) => <tr key={product._id} className="hover text-center">
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
                                <td>{product.timePosted}</td>
                                <td>
                                    <button className='bg-primary p-2 rounded-xl tooltip mr-1' data-tip="Edit"><FaEdit className='text-white' /></button>
                                    <label
                                        onClick={() => setSelectedProduct(product)}
                                        className='bg-error p-2 rounded-xl tooltip mr-1'
                                        data-tip="Delete"
                                        htmlFor="confirmation-modal"
                                    ><FaTrashAlt className='text-white' /></label>
                                    <button className='bg-success p-2 rounded-xl tooltip' data-tip="Advertise this item"><FaAdversal className='text-white' /></button>
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

export default MyProducts;