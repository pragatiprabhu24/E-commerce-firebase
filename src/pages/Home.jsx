import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/app/Layout'
import HeroSection from '../components/home/HeroSection';
import Filter from '../components/home/Filter';
import ProductCard from '../components/home/ProductCard';
import Track from '../components/home/Track';
import Testimonial from '../components/home/Testmonial';
import { addToCart, removeFromCart } from '../redux/slice/cartSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);

    console.log(cart)

    const addToCartHandler = () => {
        dispatch(addToCart('shirt'))
    }

    const removeFromCartHandler = () => {
        dispatch(removeFromCart('shirt'))
    }



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
