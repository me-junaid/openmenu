import { useState } from "react";
import QRScanner from "../components/Utilis/QRScanner";

export default function ScanPage() {
  const [result, setResult] = useState(null);

  const handleScan = (text) => {
    try {
      const parsed = JSON.parse(text);
      setResult(parsed);
    } catch {
      setResult(text);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {!result ? (
        <QRScanner onScan={handleScan} />
      ) : (
        <div className="bg-gray-100 p-4 rounded w-80">
          <h2 className="font-semibold mb-2">Scanned Result</h2>
          <pre className="text-sm break-words">
            {typeof result === "string"
              ? result
              : JSON.stringify(result, null, 2)}
          </pre>

          <button
            onClick={() => setResult(null)}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded"
          >
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
}
