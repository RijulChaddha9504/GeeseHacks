"use client";

import { useSearchParams } from 'next/navigation';
import { lessonData } from '../learn/lessonData';

const AssessmentPage = () => {
    const searchParams = useSearchParams();
    const lessonTitle = searchParams.get('lesson');
    
    const lesson = Object.values(lessonData).flatMap(category => [category, ...(category.children || [])]).find(l => l.title === lessonTitle); //terrible way to do it

    if (!lesson) return <div>Lesson not found</div>;

    return (
        <div className="w-full h-screen bg-gradient-to-br from-gray-800 to-gray-950 flex flex-col items-center p-6">
            <h1 className="text-white">{lesson.title} Assessment</h1>
            <p className="text-white">{lesson.description}</p>
        </div>
    );
}

export default AssessmentPage