import React from 'react'

const HeroSection: React.FC = () => {
    return (
        <div className="w-full h-screen bg-blue-600 flex items-center justify-center text-center text-white">
            <div>
                <h1 className="text-5xl font-bold mb-4">Welcome to PostMania</h1>
                <p className="text-xl mb-6">The best platform to share and manage your posts!</p>
            </div>
        </div>
    )
}

export default HeroSection
