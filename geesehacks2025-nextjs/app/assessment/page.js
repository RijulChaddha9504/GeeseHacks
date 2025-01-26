"use client";

import { useSearchParams } from 'next/navigation';
import { lessonData } from '../learn/lessonData';

const AssessmentPage = () => {
    const searchParams = useSearchParams();
    const lessonTitle = searchParams.get('lesson');
    
    const lesson = Object.values(lessonData).flatMap(category => [category, ...(category.children || [])]).find(l => l.title === lessonTitle); //terrible way to do it

    if (!lesson) return <div>Lesson not found</div>;

    return (
        <div className="w-full h-screen">
            <h1 className="">{lesson.title} Assessment</h1>
            <p>{lesson.description}</p>
        </div>
    );
}

export default AssessmentPage