import React from 'react';
import Advertisements from '../Advertisements/Advertisements';
import Categories from '../Categories/Categories';
import Newsletter from '../Newsletter/Newsletter';
import Slider from '../Slider/Slider';

const Home = () => {    
    return (
        <div>
            <Slider />
            {
                <Advertisements />
            }
            <Categories />
            <Newsletter />
        </div>
    );
};

export default Home;