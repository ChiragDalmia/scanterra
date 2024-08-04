import React from "react";
import { NameCard } from "../ui/NameCard";

const NameSection = () => {
  const nameData = [
    {
      items: [
        {
          image: "/chirag-dalmia.jpg",
          name: "Chirag Dalmia",
          userId: "8C64FB5E-A6A3-491F-8F2A-69969BD64C24",
          githubUrl: "https://github.com/chiragdalmia",
          roles: ["Frontend"],
        },
      ],
    },
    {
      items: [
        {
          image: "/kevin.jpg",
          name: "Kevin Huang",
          userId: "9EBBB679-2533-4FCD-88C0-3A5EE4C415AF",
          githubUrl: "https://github.com/wrafp",
          roles: ["API handling"],
        },
      ],
    },
    {
      items: [
        {
          image: "/leo.jpg",
          name: "Leo Cheng",
          userId: " 89C4D960-7E37-4E79-89BF-DA4C059E3E0B",
          githubUrl: "https://github.com/LeoCh01",
          roles: ["Backend"],
        },
      ],
    },
  ];

  return (
    <section className="flex flex-col justify-center px-4 py-16">
      <div className="flex flex-wrap justify-center gap-4">
        {nameData.map((data, index) => (
          <NameCard key={index} items={data.items} />
        ))}
      </div>
    </section>
  );
};

export default NameSection;
