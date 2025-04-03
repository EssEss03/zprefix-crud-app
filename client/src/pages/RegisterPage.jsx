import RegisterForm from '../components/RegisterForm';
import '../App.css';

export default function RegisterPage() {
  return (
    <div className="register-container">
    <h1 className="register-title">📝 Register</h1>
    <p className="register-subtitle">Create your inventory manager account</p>
    <RegisterForm />
  </div>
  );
}