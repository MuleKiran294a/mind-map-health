import { motion } from "framer-motion";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center gap-3">
    <motion.div
      className="w-10 h-10 rounded-full border-2 border-muted border-t-primary"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <p className="text-sm text-muted-foreground">Analyzing...</p>
  </div>
);

export default LoadingSpinner;
