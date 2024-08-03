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
    <div className="bg-gray-900 text-white h-screen flex justify-center">
      {!isDataLoaded && (
        <>
          <div className="flex flex-col items-center">
            <BarcodeScanner onData={handleData} />
          </div>
        </>
      )}
      {isDataLoaded && (
        <>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="text-4xl font-bold text-center">{scanData.title}</div>
              <div className="text-lg text-center">Barcode: {scanData.barcode}</div>
            </div>
            <div className="w-full md:w-1/3 p-4 ">
              <CircularBar title={"Carbon Footprint"} percentage={scanData.score} size={200} strokeWidth={30} />
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="text-lg text-center">{scanData.reason}</div>
            </div>
          </div>
        </>
      )}
      {isDataLoaded && (
        <button
          className="fixed bottom-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setScanData({});
            setIsDataLoaded(false);
          }}
        >
          Scan another product
        </button>
      )}
    </div>
  );
};

export default Scan;
