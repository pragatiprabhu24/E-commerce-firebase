import React, { useContext } from 'react'
import Layout from '../components/app/Layout'
import HeroSection from '../components/home/HeroSection';
import Filter from '../components/home/Filter';
import ProductCard from '../components/home/ProductCard';
import Track from '../components/home/Track';
import Testimonial from '../components/home/Testmonial';

const Home = () => {

    return (
        <Layout>
            <HeroSection />
            <Filter />
            <ProductCard />
            <Track />
            <Testimonial />
        </Layout>
    )
}

export default Home
