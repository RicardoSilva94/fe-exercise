import React from 'react';
import Navbar from '../components/navbar.tsx';
import HeroSection from '../components/heroSection.tsx';
import Footer from '../components/footer.tsx';

const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <Footer />
        </div>
    );
};

export default Home;