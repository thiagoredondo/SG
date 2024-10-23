import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Main from './components/main';
import Contacto from './components/contacto';
import Servicios from './components/servicios';
import Nosotros from './components/nosotros';
import SeguiTuPedido from './components/seguitupedido';
import UserPanel from './components/userpanel';
import ClientPanel from './components/clientpanel';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/seguitupedido" element={<SeguiTuPedido />} />
          <Route path="/userpanel" element={<UserPanel />} />
          <Route path="/clientpanel" element={<ClientPanel />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
