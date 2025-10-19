import React from 'react';
import Banner from '../Component/Banner';
import Services from '../Component/Services';
import Testimonials from '../Component/Testimonials';
import Director from '../Component/Director';
import Newsletter from '../Component/Newsletter';
import FeaturedProducts from '../Component/FeaturedProducts';
import RecentProjects from '../Component/RecentProject';
import SalesOverview from '../Component/SalesOverview';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <RecentProjects></RecentProjects>
            <FeaturedProducts></FeaturedProducts>
            <SalesOverview></SalesOverview>
            <Testimonials></Testimonials>
            <Director></Director>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;