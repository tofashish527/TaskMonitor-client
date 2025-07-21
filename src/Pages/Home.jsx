import React from 'react';
import Banner from '../Component/Banner';
import Services from '../Component/Services';
import Testimonials from '../Component/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;