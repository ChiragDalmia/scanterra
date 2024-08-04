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
    <div className="flex h-screen justify-center text-white">
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
            <div className="w-full p-4 md:w-1/3">
              <div className="text-center text-4xl font-bold">
                {scanData.title}
              </div>
              <div className="text-center text-lg">
                Barcode: {scanData.barcode}
              </div>
            </div>
            <div className="w-full p-4 md:w-1/3">
              <CircularBar
                title={"Carbon Footprint"}
                percentage={scanData.score}
                size={200}
                strokeWidth={20}
              />
            </div>
            <div className="w-full p-4 md:w-1/3">
              <div className="text-center text-lg">{scanData.reason}</div>
            </div>
          </div>
        </>
      )}
      {isDataLoaded && (
        <button
          className="fixed bottom-0 right-0 m-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
