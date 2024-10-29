import { useState, useEffect } from "react";

let recognition: SpeechRecognition | null = null;

if ("webkitSpeechRecognition" in window) {
   recognition = new webkitSpeechRecognition();
   recognition.lang = "en-US";
   recognition.continuous = true;
   recognition.interimResults = false; // You can enable interim results if you want real-time updates
}

const useSpeechRecognition = () => {
   const [text, setText] = useState<string>("");
   const [isListening, setIsListening] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (!recognition) return;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
         const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join("");
         setText(transcript);
      };

      recognition.onerror = (event) => {
         setError(event.error); // Capture any errors
         setIsListening(false);
      };

      recognition.onend = () => {
         setIsListening(false); // Reset the listening state when speech ends
      };
   }, []);

   const startListening = () => {
      if (recognition && !isListening) {
         setText(""); // Clear previous text
         setIsListening(true);
         recognition.start(); // Start speech recognition
         setError(null); // Reset error
      }
   };

   const stopListening = () => {
      if (recognition && isListening) {
         recognition.stop(); // Stop the speech recognition
         setIsListening(false);
      }
   };

   return { text, isListening, error, startListening, stopListening, hasRecognitionSupport: !!recognition };
};

export default useSpeechRecognition;
