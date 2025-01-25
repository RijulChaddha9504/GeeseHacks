"use client";

import { useState } from "react";
import { lessonData } from "../lessonData";
import { Button } from "@/components/ui/button";

//recursively render a node and its children
function LessonTree({ node }) {

    const onClick = () => {
        console.log("clicked")
    };

    return (
        <div className="flex flex-col items-center my-4">
            <Button
                variant="outline"
                onClick={onClick}
                className="w-48 h-24 text-left"
            >
                {node.title}
            </Button>

            {node.children?.length > 0 && (
                <div className="flex justify-center space-x-8 mt-6">
                    {node.children.map((child) => (
                        <LessonTree key={child.title} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
}

function Lesson({ selectedType }) {
    const data = lessonData[selectedType];

    return (
        <div className="p-4">
            <div className="flex justify-center">
                <LessonTree node={data} />
            </div>
        </div>
    );
}

export default Lesson;
