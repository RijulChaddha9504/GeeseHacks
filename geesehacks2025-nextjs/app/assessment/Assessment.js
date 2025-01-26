import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

const Assessment = ({ lesson, onClose }) => {
    if (!lesson) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="w-[40vw] relative flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <CardHeader
                    className="text-center"
                >
                    <CardTitle>{lesson.title}</CardTitle>
                </CardHeader>

                <CardContent
                    className="text-center">
                    <CardDescription>{lesson.description}</CardDescription>
                </CardContent>

                <CardFooter className="flex justify-center items-end">
                    <Button>Start Lesson</Button>
                </CardFooter>
            </Card>
        </div>,
        document.body
    );
};

export default Assessment