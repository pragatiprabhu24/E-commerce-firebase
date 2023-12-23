import React, { useContext } from "react";
import Layout from "../components/app/Layout";
import HeroSection from "../components/home/HeroSection";
import Filter from "../components/home/Filter";
import ProductCard from "../components/home/ProductCard";
import Track from "../components/home/Track";
import Testimonial from "../components/home/Testmonial";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <div class="container">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mt-10 px-5 text-gray-900">
          Our Latest Collection
        </h1>
        <div class="h-1 w-20 px-5 bg-yellow-400 rounded"></div>
      </div>
      <ProductCard count={4} />
      <Track />
      <Testimonial />
    </Layout>
  );
};

export default Home;
