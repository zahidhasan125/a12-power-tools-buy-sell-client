import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BuyNowModal from './BuyNowModal/BuyNowModal';
import ProductCard from './ProductCard/ProductCard';

const Products = () => {
    const data = useLoaderData();
    const { category, products } = data;
    const [selectedProduct, setSelectedProduct] = useState(null);
    return (
        <div className='my-8'>
            <h2 className='text-4xl text-center mb-8'>You viewing products for <strong>{category}</strong>.</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8'>
                {products.map(product => <ProductCard
                    key={product._id}
                    product={product}
                    setSelectedProduct={setSelectedProduct}
                />)}
            </div>
            {
                selectedProduct &&
                <BuyNowModal
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />
            }
            
        </div>
    );
};

export default Products;