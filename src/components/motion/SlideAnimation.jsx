import { motion } from "framer-motion";

const SlideAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{
        x: "100vw",
        opacity: 0,
      }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "absolute",
        width: "100%",
        overflowX: "hidden",
        height: "100vh",
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideAnimation;
