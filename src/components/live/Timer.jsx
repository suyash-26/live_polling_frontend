import React, { useEffect, useState } from "react";

export default function Timer({ startTime, onTimeUp, isActive = true }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Reset timer when startTime changes
    if (startTime <= 0) {
      return;
    }
    setTimer(startTime);
  }, [startTime]);

  useEffect(() => {
    if (!isActive || timer <= 0) return;

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onTimeUp?.(); // Callback when timer reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [timer, isActive, onTimeUp]);

  // Format time as MM:SS if you want
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      className={`timer ${timer <= 10 ? "warning" : ""} ${
        timer <= 5 ? "critical" : ""
      }`}
    >
      {formatTime(timer)}
    </div>
  );
}
