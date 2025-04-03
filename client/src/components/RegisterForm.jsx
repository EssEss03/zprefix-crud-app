import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful!');
        navigate('/');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      alert('Network error. Is the backend running?');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
    <input
      placeholder="First Name"
      value={form.first_name}
      onChange={(e) => setForm({ ...form, first_name: e.target.value })}
    />
    <input
      placeholder="Last Name"
      value={form.last_name}
      onChange={(e) => setForm({ ...form, last_name: e.target.value })}
    />
    <input
      placeholder="Username"
      value={form.username}
      onChange={(e) => setForm({ ...form, username: e.target.value })}
    />
    <input
      type="password"
      placeholder="Password"
      value={form.password}
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />
    <button type="submit">Register</button>
  </form>
  );
}
