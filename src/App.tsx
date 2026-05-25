
import { Hero } from './components/sections/Hero';
import { Banner } from './components/sections/Banner';
import { About } from './components/sections/About';
import { Products } from './components/sections/Products';
import { Benefits } from './components/sections/Benefits';
import { HoneyUses } from './components/sections/HoneyUses';
import { Combos } from './components/sections/Combos';
import { Gallery } from './components/sections/Gallery';
import { Reviews } from './components/sections/Reviews';
import { ContactFooter } from './components/sections/ContactFooter';
import { CartSidebar } from './components/sections/CartSidebar';
import { CartProvider } from './context/CartContext';
import { BackToTop } from './components/ui/BackToTop';
import { HoneyLoader } from './components/ui/HoneyLoader';
import { SideNav } from './components/ui/SideNav';
import { useState, useEffect } from 'react';

const App = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);
  return (
    <CartProvider>
      <HoneyLoader onFinish={() => { /* can hook analytics */ }} />
      {ready && (
        <div className="font-body bg-black text-white min-h-screen selection:bg-honey-400/40 selection:text-honey-100 cursor-goldring">
          <SideNav />
          <Hero />
          <Banner />
          <About />
          <Benefits />
          <HoneyUses />
          <Products />
          <Combos />
          <Gallery />
          <Reviews />
          <ContactFooter />
          <CartSidebar />
          <BackToTop />
        </div>
      )}
    </CartProvider>
  );
};

export default App;
