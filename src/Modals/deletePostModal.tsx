import React from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/authContext.tsx'

interface DeletePostModalProps {
    isOpen: boolean
    onClose: () => void
    postId: number
    onDelete: (postId: number) => void
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({ isOpen, onClose, postId, onDelete }) => {
    const { user } = useAuth()

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/posts/${postId}`, {
                data: { userId: user?.id }
            })
            onDelete(postId)
            onClose()
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Delete Post</h2>
                <p className="mb-4">Are you sure you want to delete this post?</p>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletePostModal
