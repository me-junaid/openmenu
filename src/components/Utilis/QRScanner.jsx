import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

export default function QRScanner({ onScan }) {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    
    // Using a Ref to track if we already found a result to prevent double-firing
    let isScanning = true;

    const startScanner = async () => {
      try {
        // 1. Define constraints
        const constraints = {
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
        };

        // 2. Use decodeFromConstraints instead of decodeFromVideoDevice
        // This method handles the camera stream and decoding loop automatically
        const controls = await codeReader.decodeFromConstraints(
          constraints,
          videoRef.current,
          (result, err) => {
            if (result && isScanning) {
              const text = result.getText();
              console.log("Found QR code:", text);
              
              // Vibrate and call the callback
              navigator.vibrate?.(100);
              onScan(text);
              
              // Stop scanning once found (optional: remove if you want continuous scanning)
              isScanning = false;
              controls.stop();
            }
            
            // We ignore err here because ZXing throws errors 
            // constantly while searching for a QR code in the frame
          }
        );

        controlsRef.current = controls;
      } catch (err) {
        setError("Camera access denied or not found");
        console.error("Scanner Error:", err);
      }
    };

    startScanner();

    // Cleanup: Stop the camera tracks when component unmounts
    return () => {
      isScanning = false;
      if (controlsRef.current) {
        controlsRef.current.stop();
      }
    };
  }, [onScan]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative overflow-hidden rounded-xl border-2 border-gray-300">
        <video
          ref={videoRef}
          className="w-full max-w-[400px] h-auto" // Avoid 'object-cover' during debug to see real feed
          playsInline
          muted
        />
        {/* Decorative Scanning Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-10 border-2 border-green-500 opacity-50 animate-pulse" />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      
      <p className="text-gray-500 text-xs">
        Point your camera at a QR code
      </p>
    </div>
  );
}