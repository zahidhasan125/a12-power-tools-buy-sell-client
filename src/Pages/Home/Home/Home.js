import React from 'react';
import Advertisements from '../Advertisements/Advertisements';
import Categories from '../Categories/Categories';
import Newsletter from '../Newsletter/Newsletter';
import Slider from '../Slider/Slider';
import Offers from '../Offers/Offers';
import LimitedOffers from '../LimitedOffers/LimitedOffers';

const Home = () => {
    return (
        <div>
            <Slider />
            <LimitedOffers />
            <Advertisements />
            <Offers />
            <Categories />
            <Newsletter />
        </div>
    );
};

export default Home;