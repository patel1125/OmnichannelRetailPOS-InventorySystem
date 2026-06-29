import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const fields = ['name', 'email', 'phone', 'password', 'address'] as const;

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', address: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/users/register', { ...form, role: 'customer' });
      login(data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ paddingTop: 60, maxWidth: 400 }}>
      <h1 className="display">Create your account</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="form-group" key={field}>
            <label style={{ textTransform: 'capitalize' }}>{field}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={field !== 'address'}
            />
          </div>
        ))}
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        <button className="btn btn-primary" type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Register;
