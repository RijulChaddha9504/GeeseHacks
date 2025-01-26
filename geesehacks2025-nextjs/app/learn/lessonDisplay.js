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
import { getSession, getUserById } from "../db/queries";

function LearnPage({completedNodes}) {
  const [selectedType, setSelectedType] = useState("Public Speaking");

  return (
    <div className="h-[90vh] flex overflow-hidden bg-gradient-to-br from-gray-800 to-gray-950">
      <div className="flex-1">
        <AutoSizer>
          {({ width, height }) => (
            <div style={{ width, height, overflow: "auto" }}>
              <Lesson selectedType={selectedType} completedNodes={completedNodes} />
            </div>
          )}
        </AutoSizer>
      </div>

      <div className="w-[20vw] bg-gray-950 flex flex-col items-center p-6 shadow-xl">
        <h1 className="text-white font-bold text-3xl mb-6">Select Type</h1>
        <Button
          onClick={() => setSelectedType("Public Speaking")}
          className="bg-[#373d60] mb-4 w-full text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Public Speaking
        </Button>
        <Button
          onClick={() => setSelectedType("Casual Talk")}
          className="bg-[#373d60] mb-4 w-full text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Casual Talk
        </Button>
        <Button
          onClick={() => setSelectedType("Interview Prep")}
          className="bg-[#373d60] w-full text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Interview Prep
        </Button>
      </div>
    </div>
  );
}

export default LearnPage;
