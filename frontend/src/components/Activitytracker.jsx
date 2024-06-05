import  { useEffect, useRef } from 'react';
import axios from 'axios';

export default function Activitytracker({userId}) {
    const intervalRef = useRef(null); // Ref to store interval ID

  useEffect(() => {
    const updateUserActivity = async () => {
      // console.log(userId)
      if(userId == null){
        
        return
      }
      try {
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/admin/activity`, { userId });
      } catch (error) {
        console.error('Error updating user activity:', error);
    
      }
    };

    updateUserActivity(); // Update activity immediately when component mounts

    intervalRef.current = setInterval(updateUserActivity, 10000); // Update activity every minute

    // Cleanup function
    return () => {
      clearInterval(intervalRef.current); // Clear interval when component unmounts
    };
  }, [userId]);

  return null; // This component doesn't render anything visible
  
}
