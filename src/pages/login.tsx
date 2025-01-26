import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar.tsx'
import { useAuth } from '../contexts/authContext.tsx'
import Imagebg from '../assets/Imagebg.jpg'


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        try {
            const response = await axios.get('http://localhost:5000/users', {
                params: {
                    email: username,
                    password: password
                }
            })

            if (response.data.length > 0) {
                login(response.data[0])
                navigate('/profile')
                console.log('Login successful')
            } else {
                setError('Invalid email or password')
            }
        } catch (err) {
            setError('An error occurred during login')
            console.error(err)
        }
    }

    return (
        <>
            <main className="flex-grow">
                <Navbar />
                <div
                    className="min-h-screen flex items-center justify-center p-4"
                    style={{
                        backgroundImage: `url(${Imagebg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
                        {error && (
                            <div className="text-red-500 text-center mb-4">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="your@email.com"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default LoginPage