import { useCallback, useEffect, useRef, useState } from "react";
import { withErrorHandling } from "../../../utils/error";
import type { PinInputRef } from "../../../components";

export const useSetupPin = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState<[string, string]>(["", ""]);
  const pinInputRef = useRef<PinInputRef>(null);

  const reset = useCallback(() => {
    pinInputRef.current?.clear();
    setPins(["", ""]);
  }, []);

  const savePin = useCallback(async (pin: string) => {
    console.log("[pin]", pin);
  }, []);

  const trigger = useCallback(
    async (pins: [string, string]) => {
      await withErrorHandling(async () => {
        if (pins[0] !== pins[1]) {
          reset();
          throw new Error("Pin does not match");
        }
        await savePin(pins[0]);
        return;
      });
    },
    [reset, savePin]
  );

  const handleInputComplete = useCallback(
    async (code?: string) => {
      if (!code && pins.findIndex((p) => p.length !== 6) == -1) {
        setLoading(true);
        await trigger(pins);
        setLoading(false);
      }

      if (code) {
        if (pins[0].length === 0) {
          setPins([code, ""]);
          pinInputRef.current?.clear();
        } else if (pins[1].length === 0) {
          setPins((prev) => [prev[0], code]);
        }
      }
    },
    [pins, trigger]
  );

  useEffect(() => {
    if (pins[0].length === 6 && pins[1].length === 6) {
      trigger(pins);
    }
  }, [pins, trigger]);

  return { loading, handleInputComplete, codes: pins, reset, pinInputRef };
};
