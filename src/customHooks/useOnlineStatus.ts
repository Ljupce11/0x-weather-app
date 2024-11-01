import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useOnlineStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const handleOffline = useCallback(() => {
    setIsOffline(true);
    toast.error('No internet connection.');
  }, []);
  const handleOnline = useCallback(() => {
    setIsOffline(false);
    toast.success("You're back online.", { duration: 4000 });
  }, []);

  useEffect(() => {
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [handleOffline, handleOnline]);

  return isOffline;
}