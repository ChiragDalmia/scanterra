import React, { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import ParticleSwarmLoader from "./ui/ParticleSwarmLoader";
import ScanButton from "./ui/ScanButton";

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

    if (localStorage.getItem(barcode)) {
      return JSON.parse(localStorage.getItem(barcode) as string);
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

    localStorage.setItem(barcode, JSON.stringify(ret));
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
      <h1 className="mt-16 text-center text-4xl font-bold md:mt-8">
        Scan a product barcode
      </h1>
      {!isLoading && (
        <>
          <div className="overflow-hidden mt-10 rounded-lg shadow-lg">
            <video ref={ref} className="h-auto w-full max-w-md object-cover " />
          </div>
          <ScanButton
            onClick={() => setIsScanning(!isScanning)}
            className=""
            hoverColor={isScanning ? "red" : "green"}
          >
            {isScanning ? "Stop Scanning" : "Start Scanning"}
          </ScanButton>
        </>
      )}

      {isLoading && (
        <div className="my-8 text-center text-xl font-bold">
          <div className="flex items-center justify-center">
            <ParticleSwarmLoader />
          </div>
          <p className="mt-4">Loading product data...</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;