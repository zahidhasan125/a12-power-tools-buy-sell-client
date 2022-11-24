import React from 'react';
import toast from 'react-hot-toast';
import Slider from '../Slider/Slider';

const Home = () => {
    const showToast = () => {
        toast.success('Clicked')
    }
    return (
        <div>
            <Slider />
        </div>
    );
};

export default Home;