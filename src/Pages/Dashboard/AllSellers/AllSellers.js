import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Loading from '../../Shared/Loading/Loading';

const AllSellers = () => {
    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/sellers`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loading />
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
            </div>
        </div>
    );
};

export default AllSellers;