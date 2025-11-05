"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import dynamic from 'next/dynamic'
const DynamicLiquidChrome = dynamic(() => import('../components/LiquidChrome'), { ssr: false })
import Navbar from "../components/Navbar"
import AnimatedCard from "../components/AnimatedCard"
import { FaClipboardList, FaChartLine, FaFileUpload, FaTrophy } from "react-icons/fa"
import { motion } from "framer-motion"
import styles from "../styles/glass.module.css"

export default function Home() {
  const router = useRouter()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const userId = localStorage.getItem("user_id")
    const name = localStorage.getItem("user_name")

    if (!userId) {
      router.push("/login")
    } else {
      setUserName(name)
    }
  }, [])

  const features = [
    {
      icon: <FaClipboardList />,
      title: "Problem Tracker",
      description:
        "Log and organize your coding problems by difficulty, topic, and track your progress systematically.",
      link: "/tracker",
      color: "#60A5FA",
    },
    {
      icon: <FaChartLine />,
      title: "Analytics Dashboard",
      description:
        "Visualize your progress with beautiful charts showing problems solved by difficulty, topic, and points earned.",
      link: "/dashboard",
      color: "#6366F1",
    },
    {
      icon: <FaFileUpload />,
      title: "Resume Upload",
      description: "Upload your resume to AWS S3 and get AI-powered feedback to optimize it for technical interviews.",
      link: "/upload",
      color: "#8B5CF6",
    },
    {
      icon: <FaTrophy />,
      title: "Leaderboard",
      description: "Compete with other users and see where you rank based on total problems solved and points earned.",
      link: "/dashboard",
      color: "#A78BFA",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Liquid Chrome background effect - fixed behind all content */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <DynamicLiquidChrome baseColor={[0.08, 0.08, 0.12]} speed={0.8} amplitude={0.5} interactive={true} />
      </div>

      {/* All content above the background */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <div className="container-custom">
          <motion.div
            className={`${styles.pageHeaderGlass} page-header`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`page-title ${styles.glassTextGlow}`}>Welcome to InterviewMate 🎯</h1>
            <p className="page-subtitle">Your complete platform for technical interview preparation</p>
          </motion.div>

          {/* Features Grid */}
          <motion.div className="row g-4 mb-5" variants={containerVariants} initial="hidden" animate="visible">
            {features.map((feature, index) => (
              <motion.div key={index} className="col-md-6 col-lg-3" variants={itemVariants}>
                <AnimatedCard delay={index * 0.1}>
                  <div className={`${styles.cardIconGlass} card-icon`} style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-text">{feature.description}</p>
                  <motion.button
                    className={styles.glassButton}
                    onClick={() => router.push(feature.link)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <div className="row g-4 mb-5">
            <motion.div
              className="col-md-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
            <div className={styles.glassFeatureCard}>
              <h3 className="card-title">🚀 Quick Stats</h3>
              <p className="card-text mb-4">Track your progress and stay motivated with real-time statistics</p>
              <div className="row text-center g-3">
                <div className="col-4">
                  <motion.div className={styles.glassStatCard} whileHover={{ y: -5 }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#60A5FA" }}>0</h2>
                    <p style={{ margin: 0, fontSize: "0.9rem", marginTop: "0.5rem", color: "#CBD5E1" }}>
                      Problems
                    </p>
                  </motion.div>
                </div>
                <div className="col-4">
                  <motion.div className={styles.glassStatCard} whileHover={{ y: -5 }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#8B5CF6" }}>0</h2>
                    <p style={{ margin: 0, fontSize: "0.9rem", marginTop: "0.5rem", color: "#CBD5E1" }}>
                      Points
                    </p>
                  </motion.div>
                </div>
                <div className="col-4">
                  <motion.div className={styles.glassStatCard} whileHover={{ y: -5 }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#6366F1" }}>0</h2>
                    <p style={{ margin: 0, fontSize: "0.9rem", marginTop: "0.5rem", color: "#CBD5E1" }}>
                      Streak
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={styles.glassFeatureCard}>
              <h3 className="card-title">💡 Pro Tips</h3>
              <ul style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.7, fontWeight: 300 }}>
                <li>✓ Start with Easy problems to build confidence</li>
                <li>✓ Focus on understanding patterns, not memorizing</li>
                <li>✓ Practice consistently - even 1 problem daily helps</li>
                <li>✓ Review your solutions and optimize them</li>
                <li>✓ Track topics you're weak in and improve them</li>
              </ul>
            </div>
          </motion.div>
          </div>

          {/* How It Works */}
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={styles.glassFeatureCard} style={{ maxWidth: "900px", margin: "0 auto" }}>
              <h3 className="card-title">🎓 How InterviewMate Works</h3>
              <div className="row mt-4 g-3">
                {[
                  { icon: "📝", title: "Track", desc: "Log every problem you solve" },
                  { icon: "📊", title: "Analyze", desc: "Review your progress" },
                  { icon: "🎯", title: "Improve", desc: "Focus on weak areas" },
                  { icon: "🏆", title: "Succeed", desc: "Ace your interviews" },
              ].map((step, idx) => (
                <motion.div key={idx} className="col-md-3 mb-3" whileHover={{ y: -8 }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{step.icon}</div>
                  <h5 style={{ fontWeight: 600, color: "#F9FAFB", fontFamily: 'Inter' }}>{step.title}</h5>
                  <p style={{ fontSize: "0.9rem", color: "#9CA3AF", fontWeight: 300 }}>{step.desc}</p>
                </motion.div>
              ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
