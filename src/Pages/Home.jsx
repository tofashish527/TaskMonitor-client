import React from 'react';
import Banner from '../Component/Banner';
import Services from '../Component/Services';
import Testimonials from '../Component/Testimonials';
import Director from '../Component/Director';
import Newsletter from '../Component/Newsletter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Testimonials></Testimonials>
            <Director></Director>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;