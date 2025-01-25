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

const LessonDetails = ({ lesson, onClose }) => {
    if (!lesson) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="w-[40vw] h-[60vh] relative flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black"
                >
                    X
                </button>
                <CardHeader>
                    <CardTitle>{lesson.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
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

export default LessonDetails