import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext.tsx'

const Navbar: React.FC = () => {
    const [nav, setNav] = useState<boolean>(false)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleNav = (): void => {
        setNav(!nav)
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black'>
            <h1 className='w-full text-3xl font-bold text-blue-600'>PostMania</h1>
            <ul className='hidden md:flex space-x-5 whitespace-nowrap'>
                <li className='p-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300'> 
                    <Link to='/'>Home</Link>
                </li>
                {user ? (
                    <>
                        <li className='p-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300'> 
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li 
                            className='p-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300'
                            onClick={handleLogout}
                        >
                            Logout
                        </li>
                    </>
                ) : (
                    <li className='p-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300'> 
                        <Link to='/login'>Sign in</Link>
                    </li>
                )}
            </ul>
            <div className='md:hidden' onClick={handleNav}>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            <div 
                className={`fixed left-0 top-0 w-[60%] h-full bg-white border-r-2 transition-transform duration-300 ${
                    nav ? 'transform translate-x-0' : 'transform -translate-x-full'
                }`}
            >
                <h1 className='w-full text-3xl font-bold text-blue-600 m-4'>PostMania</h1>
                <ul className='uppercase p-4'>
                    <li className='p-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300'> 
                        <Link to='/'>Home</Link>
                    </li>
                    {user ? (
                        <>
                            <li className='p-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300'> 
                                <Link to='/profile'>Profile</Link>
                            </li>
                            <li 
                                className='p-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300'
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                        </>
                    ) : (
                        <li className='p-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300'> 
                            <Link to='/login'>Sign in</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar