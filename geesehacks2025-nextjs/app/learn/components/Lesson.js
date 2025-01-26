"use client";

import { useState } from "react";
import { lessonData } from "../lessonData";
import { Button } from "@/components/ui/button";
import { Tree, TreeNode } from "react-organizational-chart";
import LessonDetails from "./LessonDetails";

//recursively render a node and its children
const LessonTree = ({ node, onSelect }) => {
    return (
        <TreeNode
            label={
                <Button
                    variant="outline"
                    onClick={() => onSelect(node)}
                    className="p-6 text-left text-sm mx-4 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold shadow-md hover:shadow-lg cursor-pointer transition-all duration-200"
                >
                    {node.title}
                </Button>
            }
        >
            {node.children?.map((child) => (
                <LessonTree key={child.title} node={child} onSelect={onSelect} />
            ))}
        </TreeNode>
    );
}

const Lesson = ({ selectedType }) => {
    const [selectedLesson, setSelectedLesson] = useState(null);
    const data = lessonData[selectedType];

    return (
        <div className="p-6 text-white rounded-lg shadow-lg">
            <Tree
                llineWidth="8px"
                lineColor="#4f46e5"
                lineBorderRadius="20px"
                lineHeight="70px"
                label={
                    <Button
                        variant="outline"
                        onClick={() => setSelectedLesson({
                            title: data.title,
                            description: data.description
                        })}
                        className="mt-6 p-6 text-left text-lg rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl cursor-pointer transition-all duration-200"
                    >
                        {data.title}
                    </Button>
                }
            >
                {data.children?.map((child) => (
                    <LessonTree
                        key={child.title}
                        node={child}
                        onSelect={setSelectedLesson}
                    />
                ))}
            </Tree>

            {selectedLesson && (
                
                <LessonDetails
                    lesson={selectedLesson}
                    onClose={() => setSelectedLesson(null)}
                />
            )}
        </div>
    );
}

export default Lesson