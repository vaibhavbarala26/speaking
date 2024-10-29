import React, { useEffect, useRef, useState } from "react";

const CameraFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camera, setCamera] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    if (camera) {
      startCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const currentStream = videoRef.current.srcObject as MediaStream;
        currentStream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [camera]);

  return (
    <div className="flex flex-col items-center ">
      {camera ? (
        <>
          <div className="flex flex-col items-center w-full">
            <button
              className="bg-[#f5e4cc] w-full p-2 rounded-lg text-black mb-2"
              onClick={() => setCamera(false)}
            >
              Close Camera 📷
            </button>
            <h1 className="text-xl font-bold text-[#f5e4cc]">Camera Feed</h1>
            <div>
            <video
              ref={videoRef}
              autoPlay
              width="100%"
              height="40%"
              className="transform scale-x-[-1] mt-2 border rounded-lg shadow-md"
            />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full">
          <button
            className="bg-[#f5e4cc] w-full p-2 rounded-lg text-black"
            onClick={() => setCamera(true)}
          >
            Open Camera 📷
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraFeed;
