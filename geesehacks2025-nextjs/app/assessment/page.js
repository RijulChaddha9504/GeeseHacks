"use client";

import { useSearchParams } from 'next/navigation';
import { lessonData } from '../learn/lessonData';

const flattenLessons = (node) => {
    return [node, ...(node.children || []).flatMap(child => flattenLessons(child))];
};

const AssessmentPage = () => {
    const searchParams = useSearchParams();
    const lessonTitle = decodeURIComponent(searchParams.get('lesson'));

    console.log(lessonTitle)

    //get all lessons recursively
    const allLessons = Object.values(lessonData).flatMap(category => flattenLessons(category));
    const lesson = allLessons.find(l => l.title === lessonTitle);

    if (!lesson) return <div className="pt-20">Lesson not found</div>;

    return (
        <div className="w-full h-screen bg-gradient-to-br from-gray-800 to-gray-950 flex flex-col items-center pt-16">
            <h1 className="text-white">{lesson.title} Assessment</h1>
            <p className="text-white">{lesson.description}</p>
        </div>
    );
}

export default AssessmentPage