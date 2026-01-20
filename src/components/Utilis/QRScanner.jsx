import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

export default function QRScanner({ onScan }) {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);

  const [error, setError] = useState("");
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    const startScanner = async () => {
      try {
        // ✅ TRY BACK CAMERA FIRST (mobile)
        controlsRef.current = await codeReader.decodeFromVideoDevice(
          { facingMode: { ideal: "environment" } },
          videoRef.current,
          onDecode
        );
      } catch (err) {
        console.warn("Back camera not available, falling back", err);

        try {
          // ✅ FALLBACK TO ANY AVAILABLE CAMERA
          controlsRef.current = await codeReader.decodeFromVideoDevice(
            null,
            videoRef.current,
            onDecode
          );
        } catch (finalErr) {
          setError("Camera not accessible");
          console.error(finalErr);
        }
      }
    };

    const onDecode = (result, err) => {
      if (result && !scanned) {
        setScanned(true);
        onScan(result.text);
        navigator.vibrate?.(100);
        controlsRef.current?.stop();
      }
    };

    startScanner();

    return () => {
      controlsRef.current?.stop();
    };
  }, [onScan, scanned]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-80 h-80 rounded-xl object-cover border"
        />
        <div className="absolute inset-0 border-4 border-green-400 rounded-xl pointer-events-none" />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
