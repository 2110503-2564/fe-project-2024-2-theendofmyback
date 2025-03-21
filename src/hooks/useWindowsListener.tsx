import { useEffect, useState } from 'react';

export function useWindowsListener(eventType: string,listener:EventListener) {
    const [winWidth,setWinWidth] = useState(0);
        useEffect(() => {
            
            window.addEventListener(eventType,listener);
    
            return () => {
                window.removeEventListener(eventType,listener);
            }
            
        },[])
}