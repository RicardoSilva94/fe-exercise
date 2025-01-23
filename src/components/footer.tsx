import React from 'react'

const Footer: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white py-6">
            <div className="max-w-screen-xl mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} PostMania. All Rights Reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer
