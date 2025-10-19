import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUtilStore } from "../../store";
import SvgIcon from "./svg-icon";
import type { AppIconType } from "../../types/common";
import { AppIcons } from "../../assets/svg";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { appNavigate } from "../../utils/routing";

interface FloatingBottomBarProps {
  children?: React.ReactNode;
  className?: string;
}

export const FloatingBottomBar: React.FC<FloatingBottomBarProps> = ({
  children,
  className = "",
}) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { scrollContainerId } = useUtilStore();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const getScrollContainer = () => {
      if (scrollContainerId) {
        return document.getElementById(scrollContainerId);
      }
      // Fallback to window if no container ID provided
      return null;
    };

    scrollContainerRef.current = getScrollContainer();
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (!scrollContainer) return;

      const scrollTop = scrollContainer.scrollTop;

      // Show bar when scrolling up, hide when scrolling down
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else if (scrollTop < lastScrollTop) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollTop(scrollTop);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", throttledScroll, {
        passive: true,
      });
    } else {
      // Fallback to window scrolling
      window.addEventListener("scroll", throttledScroll, { passive: true });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", throttledScroll);
      } else {
        window.removeEventListener("scroll", throttledScroll);
      }
    };
  }, [lastScrollTop, scrollContainerId]);

  const active = useMemo(() => {
    if (pathname === "/dashboard") return "home";

    if (pathname.startsWith("/autoflow")) return "autoflow";
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="bg-[#D9D9D91A] backdrop-blur-lg border border-[#6B7280] rounded-[50px] shadow-lg px-[24px] py-[12px] flex flex-row items-center gap-[24px]">
            {children || (
              <>
                <Action
                  iconName="HomeTrendUp"
                  isActive={active === "home"}
                  label="Home"
                  onClick={() => appNavigate(navigate, "home")}
                />
                <Action
                  iconName="Lightning"
                  isActive={active === "autoflow"}
                  label="Autoflow"
                  onClick={() => appNavigate(navigate, "autoflowHome")}
                />
                <Action iconName="People" isActive={false} label="Delegation" />
                <Action iconName="Target" isActive={false} label="Goals" />
                <Action iconName="Globe" isActive={false} label="Explorer" />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface IActionProps {
  iconName: AppIconType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Action: React.FC<IActionProps> = (props) => {
  const { iconName, label, isActive = false, onClick } = props;
  return (
    <motion.button
      onClick={onClick}
      type="button"
      className={classNames("flex flex-col items-center gap-1", {
        "text-[#F9FAFBB2]": !isActive,
        "text-[#6C4EFF]": isActive,
      })}
      whileTap={{
        scale: 0.98,
      }}
    >
      <SvgIcon icon={AppIcons[iconName]} size={24} />
      <p className="text-[12px]">{label}</p>
    </motion.button>
  );
};
