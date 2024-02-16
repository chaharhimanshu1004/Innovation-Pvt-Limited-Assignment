import React  from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Image1 from '../images/logo.png'
import { useState , useEffect } from 'react'




const Navbar = () => {
  const {cart} = useSelector((state)=>state)
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0))
  }, [cart])

  return (
    <div>
      <nav className='flex justify-between items-center mt-6 h-20 max-w-6xl mx-auto'>
        <NavLink to='/home'>
          <div className='ml-5'>
            <img src={Image1}  className='h-20' />
          </div> 
        </NavLink>
        <div className='flex items-center -mt-2 font-xl text-slate-900 mr-5 space-x-6'>
          <NavLink to='/home'>
            <p className='font-semibold hover:text-red-600 hover:underline'>Home</p>
          </NavLink>
          <NavLink to='/cart'>
            <div className='relative' >
              <FaShoppingCart className='text-2xl' />
              {

              cart.length>0 &&<span className='absolute bg-red-600 text-xs w-5 h-5 rounded-full flex justify-center -top-1 items-center animate-bounce text-white -right-2'>{cart.length}</span>
              
              }
              <div>
            {
                cart.length>0 && <p className='absolute bg-red-500 rounded-full text-white flex justify-center -top-0 left-11 w-16'>${totalAmount}</p>
              }
            </div>
              
            </div>
            
            
          </NavLink>

        </div> 
      </nav>
    </div>
  )
}

export default Navbar