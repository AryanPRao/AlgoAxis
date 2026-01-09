import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getApiUrl } from '../utils/api';
import { FaUserLock, FaChartLine, FaUsers, FaRobot } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(getApiUrl('/api/login'), {
        email: formData.email,
        password: formData.password
      });

      // Store user data in localStorage
      localStorage.setItem('user_id', response.data.user.id);
      localStorage.setItem('user_name', response.data.user.name);
      localStorage.setItem('user_email', response.data.user.email);

      // Redirect to home page
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
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
                Welcome back
              </h1>
              <p className="page-subtitle">
                Sign in to continue your interview prep journey on AlgoAxis.
              </p>
            </div>

            <div className="feature-card fade-in-up">
              <h3 className="card-title">Why return today?</h3>
              <div className="row g-3 mt-3">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <FaChartLine size={20} />
                    <div>
                      <strong>Track progress</strong>
                      <p className="card-text mb-0">Keep your problem streak alive.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <FaRobot size={20} />
                    <div>
                      <strong>AI guidance</strong>
                      <p className="card-text mb-0">Get structured hints and feedback.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <FaUsers size={20} />
                    <div>
                      <strong>Groups</strong>
                      <p className="card-text mb-0">Stay accountable with peers.</p>
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
                  <FaUserLock />
                </div>
                <div>
                  <h2 className="card-title mb-1">Sign in</h2>
                  <p className="card-text mb-0">Use your account credentials.</p>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
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

                <div className="mb-4">
                  <label htmlFor="password" className="form-label-custom">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-custom"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
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
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="card-text mb-0">
                  Don't have an account? <Link href="/register">Register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
