import {useEffect, useRef, useState} from 'react';

export function useStreamingText(fullText: string, speed: number = 18) {
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [prevFullText, setPrevFullText] = useState(fullText);
  const [prevSpeed, setPrevSpeed] = useState(speed);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Synchronously reset state during rendering when props change
  // This avoids the 'react-hooks/set-state-in-effect' lint error and improves performance
  if (fullText !== prevFullText || speed !== prevSpeed) {
    setPrevFullText(fullText);
    setPrevSpeed(speed);
    setDisplayedText('');
    setIsStreaming(!!fullText);
  }

  useEffect(() => {
    indexRef.current = 0;
    // Clear any running interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!fullText) {
      return;
    }

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      setDisplayedText(fullText.slice(0, indexRef.current));

      if (indexRef.current >= fullText.length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsStreaming(false);
      }
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [fullText, speed]);

  return {displayedText, isStreaming};
}
