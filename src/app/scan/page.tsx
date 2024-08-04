"use client";
import BarcodeScanner from "@/components/barcodeScanner";
import ProductAlert from "@/components/ProductAlert";
import React, { useEffect, useState } from "react";

const Scan = () => {
  const [scanData, setScanData] = useState<any>({});
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);

  const handleData = (data: any) => {
    setScanData(data);
    setKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    setIsDataLoaded(Object.keys(scanData).length > 0);
  }, [key]);

  return (
    <div className="bg-dot-white/[0.2] relative flex min-h-screen w-full items-center justify-center bg-black">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
      <div className="container mx-auto px-4 py-8">
        {!isDataLoaded ? (
          <div className="flex flex-col items-center justify-center">
            <BarcodeScanner onData={handleData} />
          </div>
        ) : (
          <ProductAlert
            scanData={scanData}
            onClose={() => {
              setScanData({});
              setIsDataLoaded(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Scan;
