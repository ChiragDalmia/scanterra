"use client";
import BarcodeScanner from "@/components/barcodeScanner";
import CircularBar from "@/components/circularBar";
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
    <>
      {!isDataLoaded && (
        <>
          <h1 className="text-2xl font-bold mb-4">Scan a product barcode</h1>
          <BarcodeScanner onData={handleData} />
        </>
      )}
      {isDataLoaded && (
        <>
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 p-4">
              <div className="text-2xl font-bold">{scanData.title}</div>
              <div className="text-sm">Barcode: {scanData.barcode}</div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <CircularBar title={"Carbon Footprint"} percentage={scanData.score} size={200} strokeWidth={30} />
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="text-sm">{scanData.reason}</div>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsDataLoaded(false)}
          >
            Back
          </button>
        </>
      )}
    </>
  );
};

export default Scan;
