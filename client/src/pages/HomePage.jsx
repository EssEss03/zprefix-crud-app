import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import '../App.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>⚙ Home Page</h1>
      <p><em>You are currently signed out.</em></p>

      <LoginForm />

      {/* Create Account Button */}
      <p style={{ marginTop: '20px' }}>
        Don’t have an account?{' '}
        <button
          style={{
            padding: '8px 16px',
            fontWeight: 'bold',
            border: '1px solid #333',
            backgroundColor: '#eee',
            color: '#000',
            cursor: 'pointer',
            borderRadius: '5px'
          }}
          onClick={() => navigate('/register')}
        >
          Create an Account
        </button>
      </p>

      {/* Browse All Items Button */}
      <p style={{ marginTop: '20px' }}>
        Just browsing?{' '}
        <button
          style={{
            padding: '8px 16px',
            fontWeight: 'bold',
            border: '1px solid #333',
            backgroundColor: '#eee',
            color: '#000',
            cursor: 'pointer',
            borderRadius: '5px'
          }}
          onClick={() => navigate('/all-items')}
        >
          Browse All Items
        </button>
      </p>
    </div>
  );
}

