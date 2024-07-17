import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './component/scrollToTop';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css';
import { Home } from './views/home';
import injectContext from './store/appContext';
import { Navbar } from './component/navbar';
import { Footer } from './component/footer';
import { Cardinfo } from './views/cardinfo';
import { Favorites } from './component/favorites';
import { SplashScreen } from './component/Splashscreen';
import { Card } from './component/card';

const Layout = () => {
  const basename = process.env.BASENAME || '';

  return (
    <div className="background">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <SplashScreen />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<Card />} />
            <Route path="/:type/:uid" element={<Cardinfo />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
