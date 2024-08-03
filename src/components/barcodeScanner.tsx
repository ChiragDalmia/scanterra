import React, { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

interface BarcodeScannerProps {
  onData: (data: any) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onData }) => {
  const [result, setResult] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { ref, torch } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      setIsScanning(false);
    },
    paused: !isScanning,
  });

  const fetchProductData = async (barcode: string) => {
    if (!barcode) {
      return {};
    }

    let data = null;
    let ret: {
      reason?: any;
      barcode?: any;
      title?: any;
      score?: any;
    } = {};

    try {
      setIsLoading(true); // Set isLoading to true before making the fetch request
      const response = await fetch(`/api/product?barcode=${barcode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      data = await response.json();
      console.log(data);
      ret.barcode = data.barcode_number;
      ret.title = data.title;
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the fetch request is completed
    }

    try {
      setIsLoading(true); // Set isLoading to true before making the fetch request
      const response = await fetch(`/api/carbon_footprint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch carbon footprint data");
      }
      data = await response.json();
      console.log(data);

      ret.score = data.carbonFootprint.score;
      ret.reason = data.carbonFootprint.reason;
    } catch (error) {
      console.error("Error fetching carbon footprint data:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the fetch request is completed
    }

    return ret;
  };

  useEffect(() => {
    console.log(result);
    onData({});
    if (!isScanning) {
      fetchProductData(result).then((data) => onData(data));
    }
  }, [isScanning]);

  return (
    <div className="flex flex-col items-center justify-center">
      {!isLoading && (
        <>
          <h1 className="text-4xl font-bold my-8 text-center">Scan a product barcode</h1>
          <button
            className={`bg-${isScanning ? "red" : "blue"}-500 hover:bg-${
              isScanning ? "red" : "blue"
            }-700 text-white font-bold py-2 px-4 rounded mt-4`}
            onClick={() => setIsScanning(!isScanning)}
          >
            {isScanning ? "Stop Scanning" : "Start Scanning"}
          </button>
          <video ref={ref} className="p-5" />
        </>
      )}

      {isLoading && (
        <div className="text-2xl font-bold my-8 text-center">
          <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-900">
            <svg className="animate-spin rounded-full border-t-2 border-b-2 border-gray-900">
              <circle
                cx="50%"
                cy="50%"
                r="40"
                fill="transparent"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray="150 150"
              />
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(180)">
                  <stop offset="0%" stopColor="#808080" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          Loading product data...
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
