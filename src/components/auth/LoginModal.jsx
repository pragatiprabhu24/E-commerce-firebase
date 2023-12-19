import { Fragment, useRef, useState, useCallback, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { closeLoginModal } from '../../redux/slice/ModalSlice'
import { openRegisterModal } from '../../redux/slice/ModalSlice'
import { auth } from '../../firebase/FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import AppContext from '../../context/AppContext'
import { toast } from 'react-toastify'
import Loader from '../suspence/Loader'


export default function LoginModal() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const cancelButtonRef = useRef(null)
    const dispatch = useDispatch()
    const { isLoginOpen } = useSelector((store) => store.modal)
    const context = useContext(AppContext)
    const { loading, setLoading } = context

    const handleClose = useCallback(
        () => dispatch(closeLoginModal()),
        [dispatch]
    );

    const RegisterModalHandler = () => {
        dispatch(openRegisterModal())
        dispatch(closeLoginModal())
    }

    const SignInHandler = async () => {
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem('user', JSON.stringify(result))
            toast.success("Hey! Nice to meet you again")
            dispatch(closeLoginModal())
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            toast.error("Invalid Credentials")

        }
    }

    return (
        <>
            <Transition.Root show={isLoginOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden text-left transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                                    <div className="bg-white px-2 pb-4 pt-5 sm:p-4 sm:pb-4">
                                        {loading && <Loader />}
                                        <section className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                                            <div className="md:w-1/2 max-w-sm">
                                                <img
                                                    src="https://www.multiconindia.com/Content/images/product/e-commerce.gif"
                                                    alt="Sample image" />
                                            </div>
                                            <div className="md:w-1/3 max-w-sm">

                                                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                                    <p className="mx-4 mb-0 text-xl text-center font-bold text-gray-900">Sign In</p>
                                                </div>

                                                <input
                                                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                                                    type="text"
                                                    placeholder="Email Address"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />

                                                <input
                                                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <div className="mt-4 flex justify-between font-semibold text-sm">
                                                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                                                        <input className="mr-1" type="checkbox" />
                                                        <span>Remember Me</span>
                                                    </label>
                                                    <a className="text-gray-600 hover:text-gray-600 font-bold hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
                                                </div>
                                                <div className="text-center md:text-left">
                                                    <button
                                                        className="mt-4 bg-gray-900 hover:bg-gray-600 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                                                        type="submit"
                                                        onClick={SignInHandler}>
                                                        Login
                                                    </button>
                                                </div>
                                                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                                                    Don't have an account?
                                                    <a
                                                        className="ml-2 text-red-600 hover:underline hover:underline-offset-4 cursor-pointer"
                                                        onClick={RegisterModalHandler}>
                                                        Sign up
                                                    </a>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </>
    )
}
