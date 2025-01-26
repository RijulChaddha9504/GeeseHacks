"use client";

import { useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import Lesson from "./components/Lesson";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LearnPage() {
  const [selectedType, setSelectedType] = useState("Public Speaking");
  const [expanded, setExpanded] = useState(null);

  const lessonTypes = [
    { title: "Public Speaking", description: "Learn to deliver speeches confidently." },
    { title: "Casual Talk", description: "Improve everyday conversation skills." },
    { title: "Interview Prep", description: "Prepare for interviews with ease." },
    { title: "Debates", description: "Get ready to convince your peers" },
  ];

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 pt-16">
      <div className="flex-1">
        <AutoSizer>
          {({ width, height }) => (
            <div style={{ width, height, overflow: "auto" }}>
              <Lesson selectedType={selectedType} />
            </div>
          )}
        </AutoSizer>
      </div>

      <div className="w-[25vw] p-6 pr-8">
        <Card className="bg-gray-900 shadow-2xl rounded-lg text-white">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-extrabold">
              Select a Lesson Type
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Explore and choose your preferred speaking skill.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {lessonTypes.map((lesson, index) => (
                <div key={index} className="border border-gray-700 rounded-lg">
                  <div
                    onClick={() => toggleExpand(index)}
                    className={`flex justify-between items-center cursor-pointer px-4 py-3 ${
                      selectedType === lesson.title
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-800 text-gray-200" 
                    } hover:bg-indigo-500 transition-all rounded-lg`}
                  >
                    <span className="font-medium text-lg">{lesson.title}</span>
                    <span
                      className={`transform transition-transform ${
                        expanded === index ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                  {expanded === index && (
                    <div className="bg-gray-800 text-gray-300 px-4 py-2">
                      <p>{lesson.description}</p>
                      <Button
                        onClick={() => setSelectedType(lesson.title)}
                        className="mt-3 bg-indigo-600 text-white w-full py-2 hover:bg-indigo-500 transition-all rounded-lg"
                      >
                        Select {lesson.title}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LearnPage;
