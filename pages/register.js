import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/glass.module.css';

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
      const response = await axios.post('http://localhost:5000/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Automatically log in after registration
      const loginResponse = await axios.post('http://localhost:5000/api/login', {
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
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Static silk hue background (non-animated) */}
      <div className={styles.silkHueBackground} />

      {/* Centered content wrapper */}
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        padding: "2rem"
      }}>
        <div className={styles.glassFeatureCard} style={{ maxWidth: "450px", width: "100%" }}>
          <h2 className={styles.primaryHeading} style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1.5rem" }}>
            Create Account ✨
          </h2>

          {error && (
            <div style={{
              padding: "1rem",
              marginBottom: "1.5rem",
              borderRadius: "12px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#FCA5A5",
              fontSize: "0.9rem"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label htmlFor="name" style={{ 
                display: "block",
                marginBottom: "0.5rem",
                color: "#D1D5DB",
                fontSize: "0.9rem",
                fontWeight: "500"
              }}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#F9FAFB",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label htmlFor="email" style={{ 
                display: "block",
                marginBottom: "0.5rem",
                color: "#D1D5DB",
                fontSize: "0.9rem",
                fontWeight: "500"
              }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#F9FAFB",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label htmlFor="password" style={{ 
                display: "block",
                marginBottom: "0.5rem",
                color: "#D1D5DB",
                fontSize: "0.9rem",
                fontWeight: "500"
              }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#F9FAFB",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="confirmPassword" style={{ 
                display: "block",
                marginBottom: "0.5rem",
                color: "#D1D5DB",
                fontSize: "0.9rem",
                fontWeight: "500"
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#F9FAFB",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className={styles.glassButton}
              style={{ width: "100%", marginBottom: "1rem" }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>
              Already have an account?{' '}
              <a href="/login" style={{ color: "#A5B4FC", textDecoration: "none", fontWeight: "500" }}>
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
