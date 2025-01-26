import React from 'react';
import Navbar from '../components/navbar.tsx';
import HeroSection from '../components/heroSection.tsx';
import Footer from '../components/footer.tsx';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
            </header>
            <main className="flex-grow">
                <HeroSection />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Home;
