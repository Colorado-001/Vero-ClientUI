import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import { cn } from "../../utils/helpers";

type Props = {
  length?: number;
  onComplete?: (pin: string) => void;
  onChange?: (pin: string) => void;
  initialValue?: string;
  className?: string;
  autoFocus?: boolean;
  secure?: boolean;
  disabled?: boolean;
};

const NUMBER_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const PinInputWithKeypad: React.FC<Props> = ({
  length = 6,
  onComplete,
  onChange,
  initialValue = "",
  className = "",
  autoFocus = true,
  secure = true,
  disabled = false,
}) => {
  const [value, setValue] = useState<string>(() =>
    initialValue.slice(0, length)
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  // expose change
  useEffect(() => onChange?.(value), [value, onChange]);

  // call onComplete if full
  useEffect(() => {
    if (value.length === length) onComplete?.(value);
  }, [value, length, onComplete]);

  // handle keyboard input
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) {
        return;
      }

      if (e.key === "Backspace") {
        setValue((v) => v.slice(0, -1));
        return;
      }
      if (e.key === "Enter") {
        if (value.length === length) onComplete?.(value);
        return;
      }
      if (/^\d$/.test(e.key)) {
        setValue((v) => (v.length < length ? v + e.key : v));
      }
    },
    [length, onComplete, value, disabled]
  );

  useEffect(() => {
    if (!autoFocus) return;
    const el = containerRef.current;
    el?.focus();
    // attach keyboard listener
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [autoFocus, handleKeyDown]);

  const pressNumber = (n: string) => {
    if (disabled) {
      return;
    }
    setValue((v) => (v.length < length ? v + n : v));
  };

  const backspace = () => {
    if (disabled) {
      return;
    }
    setValue((v) => v.slice(0, -1));
  };

  const cells = useMemo(() => {
    const arr = Array.from({ length }, (_, i) => value[i] ?? "");
    return arr;
  }, [length, value]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={cn("w-full mx-auto outline-none", className)}
      aria-label="PIN input"
    >
      {/* Display */}
      <div className="flex items-center justify-between mb-4 w-full">
        <div className="flex flex-row justify-center items-center gap-1 bg-[#1A1C22] w-full rounded-[50px] px-[20px] h-[50px]">
          {cells.map((c, i) => (
            <div
              key={i}
              className="text-[#F9FAFB] leading-[50px] font-medium"
              aria-hidden
            >
              {c ? (
                secure ? (
                  <span className="block">*</span>
                ) : (
                  <span className="block">{c}</span>
                )
              ) : (
                <span className="text-[#6B7280] block font-normal">*</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom keypad */}
      <div className="grid grid-cols-3 gap-2 w-fit mx-auto mt-8">
        {NUMBER_KEYS.slice(0, 3).map((n) => (
          <KeypadKey key={n} label={n} onPress={() => pressNumber(n)} />
        ))}

        {NUMBER_KEYS.slice(3, 6).map((n) => (
          <KeypadKey key={n} label={n} onPress={() => pressNumber(n)} />
        ))}

        {NUMBER_KEYS.slice(6, 9).map((n) => (
          <KeypadKey key={n} label={n} onPress={() => pressNumber(n)} />
        ))}

        {/* last row: empty, 0, backspace */}
        <div />
        <KeypadKey label={"0"} onPress={() => pressNumber("0")} />
        <KeypadKey label={"⌫"} onPress={backspace} variant="secondary" />
      </div>
    </div>
  );
};

/* Small keyed button component */
const KeypadKey: React.FC<{
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}> = ({ label, onPress, variant = "primary" }) => {
  const isSecondary = variant === "secondary";

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onPress}
      type="button"
      className={`h-[80px] w-[80px] rounded-full flex items-center justify-center text-[28px] font-medium transition ${
        isSecondary
          ? "bg-white/6 hover:bg-white/8"
          : "bg-white/4 hover:bg-white/6"
      }`}
      aria-label={`Key ${label}`}
    >
      {label}
    </motion.button>
  );
};
