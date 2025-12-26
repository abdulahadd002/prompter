import { useState, useCallback } from 'react';

export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);

      setTimeout(() => {
        setCopied(false);
      }, resetDelay);

      return true;
    } catch (err) {
      setError(err);
      setCopied(false);
      return false;
    }
  }, [resetDelay]);

  return {
    copied,
    error,
    copyToClipboard
  };
}
