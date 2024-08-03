"use client";
import React, { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

interface BarcodeScannerProps {
  onData: (data: any) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onData }) => {
  const [result, setResult] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);

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
    }

    try {
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
    <>
      <video ref={ref} />
      <button onClick={() => setIsScanning(!isScanning)}>{isScanning ? "Stop Scanning" : "Start Scanning"}</button>
    </>
  );
};

export default BarcodeScanner;
