import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: '#f4f4f4',
      borderBottom: '2px solid #ccc',
      padding: '10px 0',
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      zIndex: 1000
    }}>
      <span style={{ fontWeight: 'bold' }}>⚙ ZPrefix App</span>
      <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
      <Link to="/all-items" style={{ textDecoration: 'none', color: '#333' }}>All Items</Link>
      {token && <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link>}
      {token ? (
        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer' }}>Logout</button>
      ) : (
        <Link to="/register" style={{ textDecoration: 'none', color: '#333' }}>Register</Link>
      )}
    </nav>
  );
}
