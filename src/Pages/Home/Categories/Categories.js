import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard/CategoryCard';

const Categories = () => {
    const [productCategory, setProductCategory] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/category')
            .then(res => res.json())
            .then(data => setProductCategory(data))
    }, [])
    return (
        <fieldset className="border border-solid border-primary rounded-xl p-3 m-2">
            <legend className="px-2 text-3xl font-bold">Products Category</legend>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                {
                    productCategory.map(category => <CategoryCard key={category._id} category={category} />)
                }

            </div>
        </fieldset>
    );
};

export default Categories;