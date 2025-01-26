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
                            "p-6 text-left text-sm font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl",
                            {
                                "border-green-500 border-4": completedNodes.includes(node.title)
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
    const [selectedLesson, setSelectedLesson] = useState(null);
    const data = lessonData[selectedType];

    return (
        <div className="p-4">
            <Tree
                lineWidth={'2px'}
                lineColor={'#94a3b8'}
                lineBorderRadius={'10px'}
                lineHeight={'80px'}
                label={
                    <Button
                        variant="outline"
                        onClick={() => setSelectedLesson({
                            title: data.title,
                            description: data.description
                        })}
                        // className="p-6 text-left text-sm mt-8 font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        className={
                            classNames(
                                "p-6 text-left text-sm font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl",
                                {
                                    "border-green-500 border-4": completedNodes.includes(data.title)
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
