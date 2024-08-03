"use client";
import React, { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

const BarcodeScanner: React.FC = () => {
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
    let data = null;
    barcode = "060410025987";

    console.log("Fetching product data for barcode:", barcode);
    try {
      const response = await fetch(`/api/product?barcode=${barcode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }

    try {
      console.log("Fetching carbon footprint data for product:", data);
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
    } catch (error) {
      console.error("Error fetching carbon footprint data:", error);
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
      {/* <button onClick={() => setIsScanning(!isScanning)}>{isScanning ? "Stop Scanning" : "Start Scanning"}</button> */}
      <button onClick={() => fetchProductData(result)}>{isScanning ? "Stop Scanning" : "Start Scanning"}</button>
    </>
  );
};

export default BarcodeScanner;
