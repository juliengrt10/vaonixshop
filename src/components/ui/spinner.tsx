import { motion } from 'framer-motion';

export const Spinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <motion.div
      className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

export const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background">
    <motion.div
      className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full mb-4"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
    <p className="text-muted-foreground">Chargement...</p>
  </div>
);