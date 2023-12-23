import React, { useContext, useState } from "react";
import Layout from "../components/app/Layout";
import AppContext from "../context/AppContext";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fireDB } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { clearCart } from "../redux/slice/cartSlice";

const Checkout = () => {
  const context = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { grandTotal } = context;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const cart = useSelector((state) => state.cart);

  const buyNow = async () => {
    // validation
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      toast.error("All fields are required");
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    console.log(addressInfo);

    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "Yunique",
      description: "for testing purpose",
      handler: async function (response) {
        navigate("/");
        toast.success("Order placed successfully");

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cart,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
        };

        try {
          const orderRef = collection(fireDB, "orders");
          await addDoc(orderRef, orderInfo);
          dispatch(clearCart());
        } catch (error) {
          console.log(error);
        }
      },

      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  return (
    <Layout>
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <img src="https://cdn.dribbble.com/users/3232028/screenshots/17250321/media/642c6f61b195e721ee4582d5b574e220.gif" />
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p class="text-xl font-medium">Address Details</p>
          <p class="text-gray-400">
            Complete your order by providing your address details.
          </p>
          <div class="">
            <label
              for="card-holder"
              class="mt-4 mb-2 block text-sm font-medium"
            >
              Name
            </label>
            <div class="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">
              Mobile Number
            </label>

            <div class="relative">
              <input
                type="text"
                id="card-no"
                name="card-no"
                class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ENTER YOUR MOBILE NUMBER"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  class="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                </svg>
              </div>
            </div>

            <label
              for="billing-address"
              class="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div class="flex flex-col sm:flex-row">
              <div class="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    class="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>
              <input
                type="text"
                name="billing-zip"
                class="flex-shrink-0 sm:w-5/12 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">₹ {grandTotal}</p>
            </div>
          </div>
          <button
            type="submit"
            class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            onClick={() => buyNow()}
          >
            Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
