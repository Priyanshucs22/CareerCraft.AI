import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Basic validation
      if (!form.name || !form.email || !form.password) {
        setError('Please fill in all fields');
        return;
      }

      if (form.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setSuccess('Registration successful! Redirecting...');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success mb-4">
          <span>{success}</span>
        </div>
      )}

      <input
        className="input input-bordered w-full mb-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        disabled={loading}
      />
      <input
        className="input input-bordered w-full mb-2"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        disabled={loading}
      />
      <input
        className="input input-bordered w-full mb-4"
        type="password"
        placeholder="Password (min 6 characters)"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        disabled={loading}
      />
      <button
        className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
        onClick={register}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
}

export default Register;
