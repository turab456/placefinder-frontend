import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format.';
    if (formData.password.length < 6) return 'Password must be at least 6 characters long.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed.');

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500">
      <div className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-lg shadow-pink-500/50 animate-pulse-slow">
        {/* Glitch Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-transparent opacity-20 animate-glitch"></div>

        <h2 className="text-4xl font-extrabold text-white mb-6 text-center tracking-wide">
          Yo, Welcome Back! 😎
        </h2>
        <p className="text-center text-sky-200 mb-6">Log in to vibe with local spots!</p>

        {error && <p className="text-red-300 text-center mb-4">{error}</p>}
        {success && <p className="text-green-300 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-sky-100">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 bg-white bg-opacity-20 rounded-full text-white placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200"
              placeholder="you@vibemail.com"
              aria-label="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-sky-100">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 bg-white bg-opacity-20 rounded-full text-white placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200"
              placeholder="Your secret password"
              aria-label="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-700 hover:scale-105 transition duration-300 shadow-lg"
          >
            Login 🔥
          </button>
        </form>

        <p className="text-center text-sky-200 mt-6">
          New to the vibe?{' '}
          <Link to="/register" className="text-pink-300 hover:text-pink-400 font-semibold">
            Sign up here
          </Link>
        </p>
      </div>

      {/* Tailwind Animation for Glitch Effect */}
      <style>
        {`
          .animate-glitch {
            animation: glitch 3s infinite;
          }
          @keyframes glitch {
            0% { transform: translate(0); opacity: 0.2; }
            2% { transform: translate(-2px, 2px); opacity: 0.15; }
            4% { transform: translate(2px, -2px); opacity: 0.25; }
            6% { transform: translate(0); opacity: 0.2; }
            100% { transform: translate(0); opacity: 0.2; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
        `}
      </style>
    </section>
  );
};

export default Login;