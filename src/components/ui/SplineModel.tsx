import Spline from "@splinetool/react-spline/next";

import React from "react";

const SplineModel = () => {
  return (
    <div className="absolute h-[400px] w-full rounded-full">
      <Spline scene="https://prod.spline.design/M-d56ViJl2ePqteH/scene.splinecode" />
    </div>
  );
};

export default SplineModel;
