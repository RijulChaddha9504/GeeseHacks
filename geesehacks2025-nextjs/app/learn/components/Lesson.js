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
                    className="p-6 text-left text-sm mx-4 font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
                        className="p-6 text-left text-sm mt-8 font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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