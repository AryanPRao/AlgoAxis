"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import styles from "../styles/glass.module.css"

export default function AnimatedCard({ children, delay = 0, color = null }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ y: -12 }}
      className={`${styles.glassCard} feature-card`}
    >
      {children}
    </motion.div>
  )
}
