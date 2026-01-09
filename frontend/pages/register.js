import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getApiUrl } from '../utils/api';
import { FaUserPlus, FaClipboardList, FaChartLine, FaUsers } from 'react-icons/fa';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(getApiUrl('/api/register'), {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Automatically log in after registration
      const loginResponse = await axios.post(getApiUrl('/api/login'), {
        email: formData.email,
        password: formData.password
      });

      // Store user data
      localStorage.setItem('user_id', loginResponse.data.user.id);
      localStorage.setItem('user_name', loginResponse.data.user.name);
      localStorage.setItem('user_email', loginResponse.data.user.email);

      router.push('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="container-custom">
        <div className="row align-items-center" style={{ minHeight: '100vh' }}>
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="page-header fade-in-up" style={{ textAlign: 'left', margin: '0 0 2rem' }}>
              <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>
                Create your account
              </h1>
              <p className="page-subtitle">
                Build your personalized interview prep workspace in minutes.
              </p>
            </div>

            <div className="feature-card fade-in-up">
              <h3 className="card-title">What you get</h3>
              <div className="row g-3 mt-3">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <FaClipboardList size={20} />
                    <div>
                      <strong>Problem tracker</strong>
                      <p className="card-text mb-0">Stay organized with tags and notes.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <FaChartLine size={20} />
                    <div>
                      <strong>Progress analytics</strong>
                      <p className="card-text mb-0">See growth with clean charts.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <FaUsers size={20} />
                    <div>
                      <strong>Group prep</strong>
                      <p className="card-text mb-0">Collaborate with peers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 offset-lg-1">
            <div className="feature-card fade-in-up">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="card-icon" style={{ fontSize: '2.5rem' }}>
                  <FaUserPlus />
                </div>
                <div>
                  <h2 className="card-title mb-1">Sign up</h2>
                  <p className="card-text mb-0">Create your account in seconds.</p>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label-custom">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-custom"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label-custom">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-custom"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label-custom">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-custom"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label-custom">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control form-control-custom"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-custom w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="card-text mb-0">
                  Already have an account? <Link href="/login">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
