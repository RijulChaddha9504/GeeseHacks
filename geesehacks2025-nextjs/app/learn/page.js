"use client";

import { useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import Lesson from "./components/Lesson";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Learn() {
  const [selectedType, setSelectedType] = useState("Public Speaking");

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="flex-1">
        <AutoSizer>
          {({ width, height }) => (
            <div style={{ width, height, overflow: "auto" }}>
              <Lesson selectedType={selectedType} />
            </div>
          )}
        </AutoSizer>
      </div>

      <div className="w-[20vw] bg-gray-950 flex flex-col items-center p-6 shadow-xl">
        <h1 className="text-white font-bold text-2xl mb-6">Select Type</h1>
        <Button
          onClick={() => setSelectedType("Public Speaking")}
          className="mb-4 w-full text-lg"
        >
          Public Speaking
        </Button>
        <Button
          onClick={() => setSelectedType("Casual Talk")}
          className="mb-4 w-full text-lg"
        >
          Casual Talk
        </Button>
        <Button
          onClick={() => setSelectedType("Interview Prep")}
          className="w-full text-lg"
        >
          Interview Prep
        </Button>
      </div>
    </div>
  );
}

export default Learn;
