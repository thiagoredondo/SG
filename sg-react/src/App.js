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
import './styles/style-index.css'; 
import './styles/style-footer.css'; 
import './styles/style-header.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/seguitupedido" element={<SeguiTuPedido />} />
        
        {/* Cambiado para no mostrar Header y Footer en el UserPanel */}
        <Route 
          path="/userpanel" 
          element={<UserPanel />} 
        />
        
        <Route 
          path="/clientpanel" 
          element={
            <>
              <Header />
              <ClientPanel />
              <Footer />
            </>
          } 
        />
      </Routes>
      
      {/* Mostrar Header y Footer solo en rutas diferentes a /userpanel */}
      {window.location.pathname !== "/userpanel" && (
        <>
          <Header />
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
