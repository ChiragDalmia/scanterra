import React from "react";
import NavigationButton from "../ui/NavigationButton";
import SplineModel from "../ui/SplineModel";

const HeroSection = () => {
  return (
    <>
      <section className="flex h-screen flex-col justify-center px-4 py-16 text-center md:text-left">
        <h1 className="mb-4 text-6xl font-bold text-green-400 md:text-8xl">
          ScanTerra
          <br />
          <span className="text-5xl md:text-7xl">
            Your
            <br />
            Carbon Footprint
            <br />
            Companion
          </span>
        </h1>
        <NavigationButton destination="scan" hoverColor="green">
          Start Scanning Now
        </NavigationButton>
        <SplineModel />
      </section>
    </>
  );
};

export default HeroSection;
