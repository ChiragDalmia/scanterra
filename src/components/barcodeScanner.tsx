"use client";
import React, { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

const BarcodeScanner: React.FC = () => {
  const [result, setResult] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>(null);

  const { ref, torch } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      setIsScanning(false);
    },
    paused: !isScanning,
  });

  const fetchProductData = async (barcode: string) => {
    console.log("Fetching product data for barcode:", barcode);
    try {
      const response = await fetch(`/api/product?barcode=${barcode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      setProductData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    if (result) {
      fetchProductData(result);
    }
  }, [result]);

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result: </span>
        <span>{result}</span>
      </p>
      <button onClick={() => setIsScanning(!isScanning)}>{isScanning ? "Stop Scanning" : "Start Scanning"}</button>
    </>
  );
};

export default BarcodeScanner;
