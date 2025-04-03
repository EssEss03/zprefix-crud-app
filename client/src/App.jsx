import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ItemDetail from './pages/ItemDetail';
import AllItemsPage from './pages/AllItemsPage';
import NavBar from './components/NavBar';

export default function App() {
  return (
  <>
    <NavBar />
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/all-items" element={<AllItemsPage />} />
        </Routes>
      </div>
    </>
  );
}