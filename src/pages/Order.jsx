import React, { useContext } from "react";
import Layout from "../components/app/Layout";
import AppContext from "../context/AppContext";

const Order = () => {
  const context = useContext(AppContext);
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const { order } = context;
  return (
    <Layout>
      <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div class="flex justify-start item-start space-y-2 flex-col">
          <h1 class="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">
            My orders
          </h1>
        </div>
        <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              {order
                .filter((obj) => obj.userid == userid)
                .map((order) =>
                  order.cart.map((item) => (
                    <>
                      <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                        <div class="pb-4 md:pb-8 w-full md:w-40">
                          <img
                            class="w-60 hidden md:block"
                            src={item.imageUrl}
                            alt="dress"
                          />
                          <img
                            class="w-60 md:hidden"
                            src={item.imageUrl}
                            alt="dress"
                          />
                        </div>
                        <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                          <div class="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 class="text-xl dark:text-white xl:text-xl font-semibold leading-6 text-gray-800">
                              {item.title}
                            </h3>
                            <div class="flex justify-start items-start flex-col space-y-2">
                              <p class="text-sm dark:text-white leading-none text-gray-800">
                                <span class="dark:text-gray-400 text-gray-300">
                                  Category:{" "}
                                </span>{" "}
                                {item.category}
                              </p>
                            </div>
                          </div>
                          <div class="flex justify-between space-x-8 items-start w-full">
                            <p class="text-base dark:text-white xl:text-lg leading-6">
                              ₹ {item.price}
                            </p>
                            <p class="text-base dark:text-white xl:text-lg leading-6 text-rose-500">
                              Deliver soon
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
