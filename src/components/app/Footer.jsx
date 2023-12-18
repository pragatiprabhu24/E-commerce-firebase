import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext'

export default function Footer() {
  const context = useContext(AppContext)
  const { toggleMode, mode } = context
  return (
    <footer className="text-gray-600 body-font bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
      <div className="container px-5 py-24 mx-auto" >
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>CATEGORIES</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }}>Home</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }}>Order</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }}>Local For Vocal</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }}>Cart</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase" style={{ color: mode === 'dark' ? 'white' : '' }}>Customer Service</h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={'/returnpolicy'} className="text-gray-600 hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }}>Return Policy</Link>
              </li>
              <li>
                <Link to={'/about'} className="text-gray-600 hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }}>About</Link>
              </li>
              <li>
                <Link to={'/contact'} className="text-gray-600 hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }}>Contact Us</Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>Services</h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={'/privacypolicy'} className="text-gray-600 hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }}>Privacy</Link>
              </li>

            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <img src="https://ecommerce-sk.vercel.app/pay.png" alt="" />
          </div>
        </div>

      </div>

      <div className="bg-yellow-400" style={{ backgroundColor: mode === 'dark' ? 'rgb(55 57 61)' : '', color: mode === 'dark' ? 'white' : '', }}>
        <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
          <Link to={'/'} className='flex'>
            <div className="flex ">
              <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Yuniq-ecommerce_logo_schwarz.png" className='w-20' />
              </h1>
            </div>
          </Link>
          <p className="flex gap-2 text-xl text-white font-bold sm:ml-6 sm:mt-0 mt-4">Made with by <img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png" className='w-5' /> Pragati Prabhu</p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-blue-500">
              <img src="https://www.freeiconspng.com/uploads/facebook-logo-3.png" className='w-5' />
            </a>
            <a className="ml-3 text-gray-100">
              <img src='https://freelogopng.com/images/all_img/1657043345twitter-logo-png.png' className='w-5' />
            </a>
            <a className="ml-3 text-gray-100">
              <img src='https://pngimg.com/d/instagram_PNG9.png' className='w-5' />
            </a>
            <a className="ml-3 text-gray-100">
              <img src='https://static.vecteezy.com/system/resources/thumbnails/016/716/468/small/whatsapp-icon-free-png.png' className='w-5' />
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}