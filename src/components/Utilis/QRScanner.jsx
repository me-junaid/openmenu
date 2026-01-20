import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { DecodeHintType, BarcodeFormat } from "@zxing/library";

export default function QRScanner({ onScan }) {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Setup Hints to support White (Inverted) QR Codes
    const hints = new Map();
    hints.set(DecodeHintType.ALSO_INVERTED, true); // <--- Key for white QR codes
    hints.set(DecodeHintType.TRY_HARDER, true);    // <--- Higher accuracy
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);

    const codeReader = new BrowserQRCodeReader(hints);
    let isScanning = true;

    const startScanner = async () => {
      try {
        const constraints = {
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        };

        // 2. Start decoding from the constraints
        const controls = await codeReader.decodeFromConstraints(
          constraints,
          videoRef.current,
          (result, err) => {
            if (result && isScanning) {
              const scannedText = result.getText();
              console.log("Scanned:", scannedText);
              
              // Prevent further scans until component logic decides
              isScanning = false; 
              
              // Feedback
              navigator.vibrate?.(100);
              onScan(scannedText);

              // Stop the camera
              controls.stop();
            }

            // Note: 'err' fires constantly when no QR is found. 
            // We don't set error state here.
          }
        );

        controlsRef.current = controls;
        setIsLoading(false);
      } catch (err) {
        console.error("Scanner Initialization Error:", err);
        setError("Camera access denied or device not found.");
        setIsLoading(false);
      }
    };

    startScanner();

    // Cleanup: stop camera tracks when the component is removed from UI
    return () => {
      isScanning = false;
      if (controlsRef.current) {
        controlsRef.current.stop();
      }
    };
  }, [onScan]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="relative w-full max-w-sm aspect-square overflow-hidden rounded-2xl bg-black shadow-xl border-4 border-gray-800">
        
        {/* The Video Feed */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            <p className="animate-pulse">Starting Camera...</p>
          </div>
        )}

        {/* Scanning UI Overlay (Square target) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-green-400 rounded-lg relative">
            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-green-500"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-green-500"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-green-500"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-green-500"></div>
            
            {/* Moving Scan Line */}
            <div className="w-full h-0.5 bg-green-400/50 absolute top-0 animate-scan"></div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
          {error}
        </div>
      )}

      <p className="text-sm text-gray-500 text-center italic">
        Supports standard and white (inverted) QR codes.
      </p>

      {/* Adding custom animation for the scan line */}
      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}