import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/authContext.tsx'
import Footer from '../components/footer.tsx'
import Navbar from '../components/navbar.tsx'
import NewPostModal from '../Modals/newPostModal.tsx'
import DeletePostModal from '../Modals/deletePostModal.tsx'
import EditPostModal from '../Modals/editPostModal.tsx'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/20/solid'

export interface Post {
    id: number
    userId: number
    title: string
    text: string
    postedAt: string
}

const Profile: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const { user } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)
    const [postToDelete, setPostToDelete] = useState<Post | null>(null)
    const [postToEdit, setPostToEdit] = useState<Post | null>(null); 
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts`, {
                    params: { userId: user?.id }
                })

                const sortedPosts = response.data.sort((a: Post, b: Post) => {
                    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
                })

                setPosts(sortedPosts)
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        }

        if (user) {
            fetchPosts()
        }
    }, [user])

    const formatDateTime = (datetime: string): string => {
        return datetime.replace('T', ' ')
    }

    if (!user) return null

    const handleNewPost = (newPost: Post) => {
        setPosts([newPost, ...posts])
    }

    const handleDeletePost = (postId: number) => {
        setPosts(posts.filter(post => post.id !== postId))
    }

    const openDeleteConfirmModal = (post: Post) => {
        setPostToDelete(post)
        setIsConfirmModalOpen(true)
    }

    const openEditModal = (post: Post) => {
        console.log("Post being passed to modal:", post);  // Verifique se os dados do post estão corretos
        setPostToEdit(post) 
        setIsEditModalOpen(true) 
    }

    const handlePostUpdate = (updatedPost: Post) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === updatedPost.id ? updatedPost : post
            )
        );
    };

    return (
        <>
            <main className="flex-grow">
                <Navbar />
                <div className="container mx-auto p-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Profile</h1>
                        </div>
                        <div className="mb-6">
                            <p>Name:<strong> {user.firstName + ' ' + user.lastName}</strong></p>
                        </div>

                        <div className='flex justify-between items-center mb-4'>
                            <h2 className="text-xl font-semibold">Your Posts</h2>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            >
                                Add New Post
                            </button>
                        </div>
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
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500 mt-2">
                                                Post Date: {formatDateTime(post.postedAt)}
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(post)}
                                                    className="bg-gray-400 hover:bg-lime-950 text-white p-1 rounded cursor-pointer"
                                                >
                                                    <PencilSquareIcon className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteConfirmModal(post)}
                                                    className="bg-gray-400 hover:bg-red-500 text-white p-1 rounded cursor-pointer"
                                                >
                                                    <TrashIcon className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <NewPostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPostAdded={handleNewPost}
            />

            <DeletePostModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                postId={postToDelete?.id || 0}
                onDelete={handleDeletePost}
            />

            <EditPostModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                post={postToEdit || { id: 0, userId: 0, title: '', text: '', postedAt: '' }}
                onUpdate={handlePostUpdate}
            />

            <Footer />
        </>
    )
}

export default Profile
