import { useState } from "react";


export default function useFeedbackText(showTime?: number): [string, (feedback: string) => void] {
  showTime ??= 2500;

  const [feedbackText, setFeedbackText] = useState('');

  function changeFeedbackText(feedback: string) {
    setFeedbackText(feedback);
    setTimeout(() => {
      setFeedbackText('');
    }, showTime);
  }
  return [feedbackText, changeFeedbackText];
}