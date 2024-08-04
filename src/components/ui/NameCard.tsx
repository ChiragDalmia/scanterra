"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const NameCard = ({
  items,
  className,
}: {
  items: {
    image: string;
    name: string;
    userId: string;
    githubUrl: string;
    roles: string[];
  }[];
  className?: string;
}) => {
  return (
    <div className={cn("w-64 rounded-xl border border-green-400", className)}>
      {items.map((item) => (
        <Link href={item.githubUrl} key={item.userId} className="block">
          <div className=" flex items-center rounded-lg p-2 transition-colors ">
            <Image
              src={item.image}
              alt={item.name}
              width={50}
              height={50}
              className="mr-3 rounded-full"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">@{item.userId}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.roles.map((role, index) => (
                  <span
                    key={index}
                    className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
