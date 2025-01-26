"use client";

import { useState } from "react";
import { lessonData } from "../lessonData";
import { Button } from "@/components/ui/button";
import { Tree, TreeNode } from "react-organizational-chart";
import LessonDetails from "./LessonDetails";
import classNames from "classnames";

//recursively render a node and its children
const LessonTree = ({ node, onSelect, completedNodes }) => {
    return (
        <TreeNode
            label={
                <Button
                    variant="outline"
                    onClick={() => onSelect(node)}

                    // className="p-6 text-left text-sm mt-8 font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    className={
                        classNames(
                            "p-6 text-left text-sm mx-4 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold shadow-md hover:shadow-lg cursor-pointer transition-all duration-200",
                            {
                                "border-green-500 border-4": completedNodes && completedNodes.includes(node.title)
                            }
                        )
                    }

                >
                    {node.title}
                </Button>
            }
        >
            {node.children?.map((child) => (
                <LessonTree key={child.title} node={child} completedNodes={completedNodes} onSelect={onSelect} />
            ))}
        </TreeNode>
    );
}

const Lesson = ({ selectedType, completedNodes }) => {
    console.log(completedNodes);
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

                        className={
                            classNames(
                                "mt-6 p-6 text-left text-lg rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl cursor-pointer transition-all duration-200",
                                {
                                    "border-green-500 border-4": completedNodes && completedNodes.includes(data.title)
                                }
                            )
                        }

                    >
                        {data.title}
                    </Button>
                }
            >
                {data.children?.map((child) => (
                    <LessonTree
                        key={child.title}
                        node={child}
                        completedNodes={completedNodes}
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
