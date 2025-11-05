"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FiMenu, FiX } from "react-icons/fi"
import styles from "../styles/glass.module.css"

export default function Navbar() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const userId = localStorage.getItem("user_id")
    const name = localStorage.getItem("user_name")

    if (userId && name) {
      setUserName(name)
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [router.pathname])

  const handleLogout = () => {
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_name")
    localStorage.removeItem("user_email")
    router.push("/login")
  }

  const navItems = isAuthenticated
    ? [
        { label: "Home", href: "/" },
        { label: "Tracker", href: "/tracker" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Resume", href: "/upload" },
      ]
    : [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
      ]

  return (
    <nav className={`${styles.glassNavbar} navbar-custom`}>
      <div className="container-custom">
        <div className="d-flex justify-content-between align-items-center">
          <Link href="/" className="navbar-brand" style={{ 
            background: "linear-gradient(135deg, #60A5FA, #6366F1, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "1.75rem",
            fontWeight: 800,
            fontFamily: 'Inter',
            textShadow: "none",
            letterSpacing: "-0.02em",
            filter: "drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))"
          }}>
            ✨ InterviewMate
          </Link>

          <div className="d-none d-lg-flex gap-3 align-items-center">
            {navItems.map((item, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={item.href} className="nav-link" style={{
                  color: "#CBD5E1",
                  fontWeight: 500,
                  fontFamily: 'Inter',
                  fontSize: "0.9375rem",
                  transition: "all 0.3s ease"
                }}>
                  {item.label}
                </Link>
              </motion.div>
            ))}
            {isAuthenticated && (
              <>
                <div className="user-greeting" style={{
                  color: "#F9FAFB",
                  fontWeight: 600,
                  fontFamily: 'Inter',
                  padding: "0.5rem 1rem",
                  background: "rgba(255, 255, 255, 0.04)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}>
                  {userName}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.glassButton}
                  onClick={handleLogout}
                  style={{
                    background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3))",
                    border: "1px solid rgba(239, 68, 68, 0.4)"
                  }}
                >
                  Logout
                </motion.button>
              </>
            )}
          </div>

          <button
            className="d-lg-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              border: "1px solid rgba(59, 130, 246, 0.3)", 
              background: "rgba(59, 130, 246, 0.1)", 
              color: "#3b82f6", 
              fontSize: "1.5rem",
              padding: "0.5rem",
              borderRadius: "8px",
              backdropFilter: "blur(10px)"
            }}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 d-lg-none"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "1rem"
            }}
          >
            {navItems.map((item, idx) => (
              <Link key={idx} href={item.href} className="nav-link d-block py-2" style={{
                color: "rgba(241, 245, 249, 0.9)"
              }}>
                {item.label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <div className="py-2" style={{ color: "#f1f5f9", fontWeight: 600 }}>
                  {userName}
                </div>
                <button className={styles.glassButton} onClick={handleLogout} style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3))",
                  border: "1px solid rgba(239, 68, 68, 0.4)"
                }}>
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
