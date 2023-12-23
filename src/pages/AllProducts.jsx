import React from "react";
import ProductCard from "../components/home/ProductCard";
import Layout from "../components/app/Layout";
import Filter from "../components/home/Filter";

const AllProducts = () => {
  return (
    <Layout>
      <Filter />
      <ProductCard />
    </Layout>
  );
};

export default AllProducts;
