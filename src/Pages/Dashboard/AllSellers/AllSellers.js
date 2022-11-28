import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllSellers = () => {
    const [selectedSeller, setSelectedSeller] = useState(null);
    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/sellers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('buy-sell-power-tools-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loading />
    }

    const handleDeleteSeller = id => {
        fetch(`http://localhost:5000/sellers/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('buy-sell-power-tools-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    toast.success('Seller Deleted Successfully!')
                }
        })
    }

    const closeModal = () => {
        setSelectedSeller(null);
    }
    return (
        <div className='my-8'>
            <h3 className='text-3xl font-bold text-center mb-8'>All Sellers</h3>
            <div className="overflow-x-auto px-2">
                <table className="table w-full">
                    <thead>
                        <tr className='text-center'>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, idx) => <tr key={seller._id} className="hover text-center">
                                <th>{idx + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    <label
                                        onClick={() => setSelectedSeller(seller)}
                                        className='bg-error p-2 rounded-xl tooltip mr-1'
                                        data-tip="Delete"
                                        htmlFor="confirmation-modal"
                                    >
                                        <FaTrashAlt className='text-white' />
                                    </label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {
                    selectedSeller &&
                    <ConfirmationModal
                        title={`Are You Sure?`}
                        message={`Do you want to delete ${selectedSeller?.name}?`}
                        successAction={handleDeleteSeller}
                        successButtonName="Delete"
                        modalData={selectedSeller}
                        closeModal={closeModal}
                    >
                    </ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default AllSellers;