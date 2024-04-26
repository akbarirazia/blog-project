import { motion } from "framer-motion"
import SplineHero from "./SplineHero"

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="  w-screen flex justify-center items-center background min-h-screen"
    >
      <SplineHero />
    </motion.section>
  )
}

export default HeroSection
