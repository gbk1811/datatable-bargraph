import React from 'react';
import Products from './components/Products';
import './App.css';
import Header from './components/Header';
function App() {
 /* Include header and product components */
    return (
      <div>
        <Header />
        <Products />

      </div> 
    );
  
}

export default App;