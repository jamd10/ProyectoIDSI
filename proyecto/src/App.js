import React from 'react';
import Navbar from './Navbar';
import Submenu from './Submenu';
import Carousell from './Carousell';
import Footer from './Footer';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Submenu />
      <Carousell />
      <Footer />
    </div>
  );
}

export default App;
