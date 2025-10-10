import { useState, useEffect, useRef } from "react";
import { is_username_available } from "../../../api/users";
import { withErrorHandling } from "../../../utils/error";

export const useTrackUsernameIsAvailable = (username: string) => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Reset state if username is empty
    if (!username || username.trim().length === 0) {
      setIsAvailable(null);
      setLoading(false);
      return;
    }

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setLoading(true);

    // Debounce the API call
    const timeoutId = setTimeout(async () => {
      abortControllerRef.current = new AbortController();

      const { isError, data } = await withErrorHandling(() =>
        is_username_available(username, abortControllerRef.current!.signal)
      );

      if (!isError && data) {
        const { isAvailable, isYou } = data;
        setIsAvailable(isAvailable || isYou);
      } else {
        setIsAvailable(null);
      }

      setLoading(false);
    }, 500); // 500ms debounce delay

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [username]);

  return { loading, available: isAvailable };
};
