import React from "react";
import useSpeechRecognition from "./components/UseSpeechrecognition";
import CameraFeed from "./components/Camerafeed";

const App: React.FC = () => {
   const { text, isListening, error, startListening, stopListening, hasRecognitionSupport } = useSpeechRecognition();

   return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
         <h1>Speech-to-Text App</h1>

         {/* Check if speech recognition is supported */}
         {!hasRecognitionSupport ? (
            <p>Your browser does not support Speech Recognition.</p>
         ) : (
            <div>
               <button onClick={startListening} disabled={isListening}>
                  {isListening ? "Listening..." : "Start Listening"}
               </button>
               <button onClick={stopListening} disabled={!isListening} style={{ marginLeft: "10px" }}>
                  Stop Listening
               </button>

               {/* Display transcribed text */}
               <div style={{ marginTop: "20px" }}>
                  <h3>Recognized Text:</h3>
                  <p>{text ? text : "No speech recognized yet."}</p>
               </div>

               {/* Display any error messages */}
               {error && (
                  <div style={{ color: "red", marginTop: "20px" }}>
                     <p>Error: {error}</p>
                  </div>
               )}
            </div>
         )}
         <div>
          <CameraFeed></CameraFeed>
         </div>
      </div>
   );
};

export default App;
