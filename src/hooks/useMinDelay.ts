import { useState, useEffect } from "react";

export function useMinDelay(loading: boolean, ms: number = 1000): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) {
      setReady(false);
      return;
    }

    const timer = setTimeout(() => setReady(true), ms);
    return () => clearTimeout(timer);
  }, [loading, ms]);

  return !ready;
}
