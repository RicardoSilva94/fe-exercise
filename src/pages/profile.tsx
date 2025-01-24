import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer.tsx'
import Navbar from '../components/navbar.tsx'

interface Post {
    id: number
    userId: number
    title: string
    text: string
    postedAt: string
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null)
    const [posts, setPosts] = useState<Post[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) {
            navigate('/login')
            return
        }

        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts`, {
                    params: { userId: parsedUser.id }
                })
                setPosts(response.data)
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        }

        fetchPosts()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    const formatDateTime = (datetime: string): string => {
        return datetime.replace('T', ' ');
    }

    if (!user) return null

    return (
        <>
        <Navbar user={user} onLogout={handleLogout} />
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Profile</h1>
                </div>
                <div className="mb-6">
                    <p><strong>Email:</strong> {user.email}</p>
                </div>

                <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
                {posts.length === 0 ? (
                    <p className="text-gray-500">No posts yet.</p>
                ) : (
                    <div className="space-y-4">
                        {posts.map(post => (
                            <div 
                                key={post.id} 
                                className="border p-4 rounded-lg bg-gray-50"
                            >
                                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                                <p>{post.text}</p>
                                <p className="text-sm text-gray-500 mt-2">Post Date: {formatDateTime(post.postedAt)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Profile
