"use client";

import { useSearchParams } from 'next/navigation';
import { lessonData } from '../learn/lessonData';

const flattenLessons = (node, parent = null) => {
  return [
    { ...node, parent },
    ...(node.children || []).flatMap(child => flattenLessons(child, node))
  ];
};

const findRootAncestor = (lesson) => {
  let current = lesson;
  while (current.parent) {
    current = current.parent;
  }
  return current;
};

const AssessmentPage = () => {
  const searchParams = useSearchParams();
  const lessonTitle = decodeURIComponent(searchParams.get('lesson'));

  //get all lessons recursively
  const allLessons = Object.values(lessonData).flatMap(category => 
    flattenLessons(category)
  );
  
  const lesson = allLessons.find(l => l.title === lessonTitle);
  
  if (!lesson) return <div className="pt-20 text-white">Lesson not found</div>;

  //get main category
  const mainCategory = findRootAncestor(lesson);
  console.log(mainCategory.title)

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-800 to-gray-950 flex flex-col items-center pt-16">
      <h1 className="text-white text-4xl font-bold mb-4">{lesson.title} Assessment</h1>
      <p className="text-gray-300 text-lg mb-8 max-w-2xl text-center">
        {lesson.description}
      </p>
      <div className="bg-gray-700 p-4 rounded-lg">
        <p className="text-gray-200">
          Category: {mainCategory.title}
        </p>
      </div>
    </div>
  );
}

export default AssessmentPage;