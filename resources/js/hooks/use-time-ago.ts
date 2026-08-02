import { useState, useEffect } from 'react';

export function useTimeAgo(date: string | Date): string {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const past = new Date(date);
      const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

      if (diffInSeconds < 60) {
        return 'Just now';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else {
        return past.toLocaleDateString();
      }
    };

    setTimeAgo(calculateTimeAgo());

    const interval = setInterval(() => {
      setTimeAgo(calculateTimeAgo());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [date]);

  return timeAgo;
}
