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
import Link from "next/link";

const LessonDetails = ({ lesson, onClose }) => {
  if (!lesson) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <Card className="w-[90vw] sm:w-[70vw] lg:w-[40vw] relative flex flex-col bg-gray-900 text-gray-200 rounded-xl shadow-lg py-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition-colors"
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

        <CardHeader className="text-center bg-gray-900 text-gray-100 py-4 rounded-t-xl">
          <CardTitle className="text-xl sm:text-2xl font-bold">{lesson.title}</CardTitle>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 text-center">
          <CardDescription className="text-gray-400 text-sm sm:text-lg">
            {lesson.description}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex flex-row justify-center items-center gap-4 p-4 sm:p-6 bg-gray-900 rounded-b-xl">
          <Link href={`/assessment?lesson=${encodeURIComponent(lesson.title)}`}>
            <Button
              className="bg-indigo-700 text-white hover:bg-indigo-600 transition-all duration-300 hover:scale-105 shadow-md w-full sm:w-[10vw]"
              onClick={onClose}
            >
              Start Lesson
            </Button>
          </Link>
          <div>
          <Button
            variant="outline"
            onClick={onClose}
            className="text-gray-800 hover:text-gray-500 border-gray-600 shadow-md transition-all hover:scale-105 duration-300 w-full sm:w-[0vw]"
          >
            Cancel
          </Button>
          </div>
      
        </CardFooter>
      </Card>
    </div>,
    document.body
  );
};

export default LessonDetails;
