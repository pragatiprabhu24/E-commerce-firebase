import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";
import { openLoginModal } from "../../redux/slice/ModalSlice";
import Loader from "../suspence/Loader";

function ProductCard({ count }) {
  const dispatch = useDispatch();
  const context = useContext(AppContext);
  const { mode, product, searchkey, filterType, filterPrice, loading } =
    context;
  const cart = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("user"));

  const addCart = (product) => {
    if (user) {
      dispatch(addToCart(product));
      toast.success("Product added to cart");
    } else {
      dispatch(openLoginModal());
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <>
      {loading && <Loader />}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="flex flex-wrap -m-4">
            {product
              .filter((obj) => obj.title.toLowerCase().includes(searchkey))
              .filter((obj) => obj.category.toLowerCase().includes(filterType))
              .filter((obj) => obj.price.includes(filterPrice))
              .slice(0, count)
              .map((item, index) => {
                const { title, price, category, imageUrl } = item;
                return (
                  <div className="p-4 md:w-1/4  drop-shadow-lg ">
                    <div
                      className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <div
                        className="flex justify-center cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/productinfo/${item.id}`)
                        }
                      >
                        <img
                          className=" rounded-2xl w-60 h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                          src={imageUrl}
                          alt="blog"
                        />
                      </div>
                      <div className="p-5 border-t-2">
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {category}
                        </h2>
                        <h1
                          className="title-font text-sm font-medium text-gray-900 mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {title}
                        </h1>
                        <p
                          className="leading-relaxed mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹ {price}
                        </p>
                        <div className=" flex justify-center">
                          {isProductInCart(item.id) && user ? (
                            <button
                              type="button"
                              disabled
                              className="focus:outline-none text-white bg-gray-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                            >
                              Added to cart
                            </button>
                          ) : (
                            <button
                              onClick={() => addCart(item)}
                              type="button"
                              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                            >
                              Add To Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {product.length === 0 && (
              <div className="w-full text-center mt-8">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductCard;
