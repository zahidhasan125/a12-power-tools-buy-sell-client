import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllBuyers = () => {
    const [selectedBuyer, setSelectedBuyer] = useState(null);
    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_dnsName}/buyers`, {
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

    const handleDeleteBuyer = id => {
        fetch(`${process.env.REACT_APP_dnsName}/buyers/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('buy-sell-power-tools-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    toast.success('Buyer Deleted Successfully!')
                }
            })
    }

    const closeModal = () => {
        setSelectedBuyer(null);
    }

    return (
        <div className='my-8'>
            <h3 className='text-3xl font-bold text-center mb-8'>All Buyers</h3>
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
                            buyers.map((buyer, idx) => <tr key={buyer._id} className="hover text-center">
                                <th>{idx + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>
                                    <label
                                        onClick={() => setSelectedBuyer(buyer)}
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
                    selectedBuyer &&
                    <ConfirmationModal
                        title={`Are You Sure?`}
                        message={`Do you want to delete ${selectedBuyer?.name}?`}
                        successAction={handleDeleteBuyer}
                        successButtonName="Delete"
                        modalData={selectedBuyer}
                        closeModal={closeModal}
                    >
                    </ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default AllBuyers;