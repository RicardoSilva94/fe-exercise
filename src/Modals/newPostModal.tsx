import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/authContext.tsx'

interface NewPostModalProps {
    isOpen: boolean
    onClose: () => void
    onPostAdded: (post: any) => void
}

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose, onPostAdded }) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const { user } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!title.trim() || !text.trim()) {
            setError('Title and text are required')
            return
        }

        try {
            const response = await axios.post('http://localhost:5000/posts', {
                userId: user?.id,
                postedAt: new Date().toISOString().slice(0, 19),
                title,
                text
            })

            onPostAdded(response.data)
            resetForm()
            onClose()
        } catch (error) {
            console.error('Error creating post:', error)
            setError('Failed to create post')
        }
    }

    const resetForm = () => {
        setTitle('')
        setText('')
        setError('')
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Create New Post</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="text" className="block mb-2">Text</label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            rows={4}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer "
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPostModal