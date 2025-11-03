// hooks/useClipboard.js
import { useState } from 'react';

export const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Reset copied status after 2 seconds
      setTimeout(() => setCopied(false), 2000);
      
      return true;
    } catch (err) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return true;
      } catch (fallbackErr) {
        console.error('Failed to copy text: ', fallbackErr);
        return false;
      }
    }
  };

  return { copied, copyToClipboard };
};