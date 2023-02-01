import React from 'react';
import slider1 from '../../../assets/slider/slider1.jpg';
import slider2 from '../../../assets/slider/slider2.jpg';
import slider3 from '../../../assets/slider/slider3.jpg';
import slider4 from '../../../assets/slider/slider4.jpg';
import './Slider.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const Slider = () => {
    const sliderData = [
        {
            id: 1,
            img: slider4,
            next: 2,
            prev: 4
        },
        {
            id: 2,
            img: slider2,
            next: 3,
            prev: 1
        },
        {
            id: 3,
            img: slider3,
            next: 4,
            prev: 2
        },
        {
            id: 4,
            img: slider1,
            next: 1,
            prev: 3
        },
    ];
    const { user } = useContext(AuthContext);
    return (
        <div className="carousel w-full">

            {
                sliderData.map(slider => <div key={slider.id} id={`${slider.id}`} className="carousel-item relative w-full mb-8">
                    <div className='img-gradient w-full'>
                        <img src={slider.img} alt="" className="w-full" />
                    </div>
                    <div className="w-1/2 px-6 absolute flex flex-col justify-start transform -translate-y-1/2 left-0 top-1/2">
                        <h2 className='text-white lg:text-6xl font-extrabold'>We're Waiting For Your Tools</h2>
                        <h4 className='text-white lg:text-2xl my-10 hidden md:block'>Post Your Used Products</h4>
                        <div className="navbar-end">
                            <Link to={user ? '/dashboard' : '/login'}><button className="btn btn-outline btn-primary bg-base-100 text-primary">Get started</button></Link>
                        </div>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                        <a href={`#${slider.prev}`} className="btn btn-circle btn-primary mr-2">❮</a>
                        <a href={`#${slider.next}`} className="btn btn-circle btn-primary">❯</a>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Slider;