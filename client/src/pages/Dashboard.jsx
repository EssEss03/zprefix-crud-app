import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import '../App.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (!token) {
      navigate('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      navigate('/');
    }
  };

  return (
    <div className="dashboard-container">
    <h1 className="dashboard-header">Dashboard</h1>
    <p className="dashboard-welcome">Welcome, {username}!</p>

    <button onClick={handleLogout} className="logout-button">Logout</button>

    <p style={{ margin: '1rem 0' }}>
      <a href="/all-items" style={{ color: '#4f46e5' }}>🔍 View Items by All Users</a>
    </p>

    <div className="item-form">
      <ItemForm refreshItems={() => window.location.reload()} />
    </div>

    <div className="item-list">
      <h2>Your Items</h2>
      <ItemList />
    </div>
  </div>
  );
}