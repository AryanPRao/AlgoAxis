"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { motion } from "framer-motion"
import styles from '../styles/glass.module.css'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError("All fields are required")
      return
    }

    setLoading(true)

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: formData.email,
        password: formData.password,
      })

      localStorage.setItem("user_id", response.data.user.id)
      localStorage.setItem("user_name", response.data.user.name)
      localStorage.setItem("user_email", response.data.user.email)

      router.push("/")
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Static silk hue background (non-animated) */}
      <div className={styles.silkHueBackground} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.glassFeatureCard}
        style={{
          maxWidth: "450px",
          width: "100%",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.primaryHeading}
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "2rem",
          }}
        >
          Welcome Back ✨
        </motion.h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="alert-custom alert-danger mb-4"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: "#f1f5f9",
                fontSize: "0.95rem",
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control-custom"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%" }}
              placeholder="your@email.com"
            />
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: "#f1f5f9",
                fontSize: "0.95rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control-custom"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: "100%" }}
              placeholder="••••••••"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="btn btn-primary-custom"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: "100%", marginBottom: "1rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            {loading ? <span>Logging in...</span> : <span>Sign In</span>}
          </motion.button>
        </form>

        <motion.div
          style={{ textAlign: "center", color: "rgba(241, 245, 249, 0.7)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>
              Register here
            </a>
          </p>
        </motion.div>
      </motion.div>
      </div>
    </div>
  )
}
