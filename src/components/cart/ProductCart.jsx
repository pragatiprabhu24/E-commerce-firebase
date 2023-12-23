import { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slice/cartSlice";
import AppContext from "../../context/AppContext";

export default function ProductCart({ openCart, setOpenCart }) {
  const context = useContext(AppContext);
  const { grandTotal } = context;
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const deleteCart = (item) => {
    dispatch(removeFromCart(item));
    toast.success("Product removed from cart");
  };

  return (
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="mt-20 flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="mt-8 flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                      </div>
                      {cart.length === 0 && (
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" />
                      )}
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="">
                                  <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="w-10"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3 className="w-40">
                                        <a href={product.href}>
                                          {product.title}
                                        </a>
                                      </h3>
                                      <p className="ml-4">₹ {product.price}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty 1</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-rose-600 hover:text-rose-400"
                                        onClick={() => deleteCart(product)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {cart.length > 0 && (
                      <div className="mb-20 border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹ {grandTotal}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            href="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-2 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <a
                              href="/allproducts"
                              className="ml-2 font-medium text-yellow-500 hover:text-yellow-300"
                              
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
