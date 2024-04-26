import { motion } from "framer-motion"
import SplineHero from "./SplineHero"

const HeroSection = () => {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center background bg-gray-900">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="  w-screen flex justify-center items-center background lg:min-h-screen h-2/3"
      >
        <SplineHero />
      </motion.section>
    </div>
  )
}

export default HeroSection
