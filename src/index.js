import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddressBook from './views/AddressBook';
import HeaderMenu from './components/HeaderMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderMenu />
      <Routes>
        <Route path="*" element={<AddressBook />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



