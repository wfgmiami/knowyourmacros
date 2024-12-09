import React from 'react';
import Nav from './components/NavFrontPage';
import InputsSection from './components/InputsSection';
import AboutSection from './components/AboutSection';
import HeroBanner from './components/HeroBanner';
import Footer from './components/Footer';

const FrontPage = () => (
  <div>
    <Nav />
    <HeroBanner />
    <AboutSection />
    <InputsSection />
    <Footer />
  </div>
);

export default FrontPage;
