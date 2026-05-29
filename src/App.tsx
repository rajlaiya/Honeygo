
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Products } from './components/sections/Products';
import { Benefits } from './components/sections/Benefits';
import { HoneyUses } from './components/sections/HoneyUses';
import { Gallery } from './components/sections/Gallery';
import { Reviews } from './components/sections/Reviews';
import { ContactFooter } from './components/sections/ContactFooter';
import { CartSidebar } from './components/sections/CartSidebar';
import { CartProvider } from './context/CartContext';
import { BackToTop } from './components/ui/BackToTop';
import { SideNav } from './components/ui/SideNav';
const App = () => {
  return (
    <CartProvider>
      <div className="font-body bg-black text-white min-h-screen selection:bg-honey-400/40 selection:text-honey-100 cursor-goldring">
        <SideNav />
        <Hero />
        <About />
        <Benefits />
        <HoneyUses />
        <Products />
        <Gallery />
        <Reviews />
        <ContactFooter />
        <CartSidebar />
        <BackToTop />
      </div>
    </CartProvider>
  );
};

export default App;
