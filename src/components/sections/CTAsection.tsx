import React from "react";
import NavigationButton from "../ui/NavigationButton";

const CTAsection = () => {
  return (
    <section className="mt-16 flex min-h-screen items-center justify-center bg-gradient-to-r from-green-600 to-green-400 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-4xl font-extrabold leading-tight text-white">
          Ready to Make <span className="text-green-200">Eco-Friendly</span>{" "}
          Choices?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-green-100">
          Start scanning products and discover their environmental impact today!
          Join the movement towards a greener future.
        </p>
        <NavigationButton
          destination="scan"
          hoverColor="black"
          className="transform rounded-full bg-white px-8 py-4 text-lg font-bold text-green-600 transition duration-300 hover:-translate-y-1 hover:shadow-lg "
        >
          Begin Your Eco Journey
        </NavigationButton>
      </div>
    </section>
  );
};

export default CTAsection;
