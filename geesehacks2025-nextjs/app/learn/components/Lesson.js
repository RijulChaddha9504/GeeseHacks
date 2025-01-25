"use client";

import { lessonData } from "../lessonData";
import { Button } from "@/components/ui/button";
import { Tree, TreeNode } from "react-organizational-chart";

const onClick = () => {
    console.log("clicked");
};

//recursively render a node and its children
function LessonTree({ node }) {
    
    return (
        <TreeNode
            label={
                <Button
                    variant="outline"
                    onClick={onClick}
                    className="w-48 h-16 text-left text-sm mx-4"
                >
                    {node.title}
                </Button>
            }
        >
            {node.children?.map((child) => (
                <LessonTree key={child.title} node={child} />
            ))}
        </TreeNode>
    );
}

function Lesson({ selectedType }) {
    const data = lessonData[selectedType];

    return (
        <div className="">
            <Tree
                lineWidth={'2px'}
                lineColor={'#94a3b8'}
                lineBorderRadius={'10px'}
                lineHeight={'80px'}
                label={
                    <Button
                        variant="outline"
                        onClick={onClick}
                        className="w-48 h-16 text-left text-sm mt-8"
                    >
                        
                        {data.title}
                    </Button>
                }
            >
                {data.children?.map((child) => (
                    <LessonTree key={child.title} node={child} />
                ))}
            </Tree>
        </div>
    );
}

export default Lesson;