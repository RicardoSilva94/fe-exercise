import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/authContext.tsx'
import type { Post } from '../pages/profile.tsx'

interface EditPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: Post;
    onUpdate: (updatedPost: Post) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, onClose, post, onUpdate }) => {
    const [title, setTitle] = useState(post.title);
    const [text, setText] = useState(post.text);
    const { user } = useAuth();

    // Update the title and text when the post changes
    useEffect(() => {
        setTitle(post.title);
        setText(post.text);
    }, [post]);


    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/posts/${post.id}`, {
                userId: user?.id,
                postedAt: new Date().toISOString().slice(0, 19),
                title,
                text,
            });

            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Post</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="text" className="block mb-2">Text</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                        rows={4}
                        required
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;
