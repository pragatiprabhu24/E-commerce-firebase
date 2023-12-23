import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import AppContext from "../../context/AppContext";
import { RxCross2 } from "react-icons/rx";
import LoginModal from "../auth/LoginModal";
import ProductCart from "../cart/ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { openRegisterModal } from "../../redux/slice/ModalSlice";
import { openLoginModal } from "../../redux/slice/ModalSlice";
import { Disclosure, Menu } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const context = useContext(AppContext);
  const { toggleMode, mode } = context;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = useSelector((state) => state.cart);

  const handleOpenRegister = () => {
    dispatch(openRegisterModal());
  };

  const logout = () => {
    localStorage.clear("user");

    setTimeout(() => {
      dispatch(openLoginModal());
    }, 3000);
  };

  const handleOpenCartDrawer = () => {
    if (user) {
      setOpenCart(true);
    } else {
      dispatch(openLoginModal());
    }
  };

  return (
    <>
      <div className="bg-white sticky top-0 z-50  ">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel
                  className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div className="flex px-4 pb-2 pt-28">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <RxCross2 />
                    </button>
                  </div>
                  <div className="flex flex-col space-y-6 border-t border-gray-200 px-4 py-6">
                    <Link
                      to={"/allproducts"}
                      className="text-sm font-medium text-gray-900 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Products
                    </Link>
                    <Link
                      to={"/contact-us"}
                      className="text-sm font-medium text-gray-900 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Contact us
                    </Link>

                    <div className="flow-root">
                      {user ? (
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/order"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    My Orders
                                  </a>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    onClick={logout}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        <a
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                          onClick={handleOpenRegister}
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          Login
                        </a>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* desktop  */}
        <header className="relative bg-white">
          <p
            className="flex h-10 items-center justify-center bg-yellow-300 px-4 text-sm font-medium text-black sm:px-6 lg:px-8"
            style={{
              backgroundColor: mode === "dark" ? "rgb(62 64 66)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            Get free delivery on orders over ₹ 300
            <a
              href="/allproducts"
              className="flex-none rounded-full bg-gray-900 px-4 ml-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Shop now <span aria-hidden="true">&rarr;</span>
            </a>
          </p>

          <nav
            aria-label="Top"
            className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl "
            style={{
              backgroundColor: mode === "dark" ? "#282c34" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(80 82 87)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <span className="sr-only">Open menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link to={"/"} className="flex">
                    <div className="flex ">
                      <h1
                        className=" text-2xl font-bold text-black  px-2 py-1 rounded"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Yuniq-ecommerce_logo_schwarz.png"
                          className="w-40"
                        />
                      </h1>
                    </div>
                  </Link>
                </div>

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to={"/allproducts"}
                      className="text-sm font-medium text-gray-700 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Products
                    </Link>
                    <Link
                      to={"/contact-us"}
                      className="text-sm font-medium text-gray-700 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Contact Us
                    </Link>
                  </div>

                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="#" className="flex items-center text-gray-700 ">
                      <img
                        src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span
                        className="ml-3 block text-sm font-medium"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        INDIA
                      </span>
                    </a>
                  </div>
                  <div className="lg:ml-8 lg:flex">
                    <Link
                      className="group -m-2 flex items-center p-2"
                      style={{ color: mode === "dark" ? "white" : "" }}
                      onClick={handleOpenCartDrawer}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>

                      <span
                        className="ml-2 text-sm font-medium text-gray-700 group-"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {user && cart.length}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </Link>
                  </div>

                  {/* Search */}

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    {user ? (
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/order"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  My Orders
                                </a>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={logout}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <a
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                        onClick={handleOpenRegister}
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Login
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <ProductCart openCart={openCart} setOpenCart={setOpenCart} />
    </>
  );
}
