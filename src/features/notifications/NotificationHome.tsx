import { useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useNotificationStore } from "../../store/notification/notification.store";
import {
  NotificationCard,
  ShimmerNotificationCardList,
} from "./NotificationCard";
import { withErrorHandling } from "../../utils/error";

export const NotificationHome = () => {
  const { loadNotifications, loading, notifications } = useNotificationStore();

  useEffect(() => {
    withErrorHandling(() => loadNotifications(false));
  }, [loadNotifications]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const shimmerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="py-[120px] px-6">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="shimmer"
            variants={shimmerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ShimmerNotificationCardList count={6} />
          </motion.div>
        ) : (
          <motion.div
            key="notifications"
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {notifications.map((not, index) => (
                <motion.div
                  key={not.id || index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NotificationCard {...not} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      <AnimatePresence>
        {!loading && notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <p className="w-full py-10 text-center text-[#6B7280] text-[15px]">
              No notifications yet
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
