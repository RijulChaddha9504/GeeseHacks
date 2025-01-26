"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { lessonData } from '../learn/lessonData';
import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';

const flattenLessons = (node, parent = null) => {
    return [
        { ...node, parent },
        ...(node.children || []).flatMap(child => flattenLessons(child, node))
    ];
};

export default function AssessmentPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <AssessmentContent />
      </Suspense>
    );
  }

function AssessmentContent() {
    const searchParams = useSearchParams();
    const lessonTitle = decodeURIComponent(searchParams.get('lesson'));

    //get all lessons recursively
    const allLessons = Object.values(lessonData).flatMap(category =>
        flattenLessons(category)
    );

    const lesson = allLessons.find(l => l.title === lessonTitle);

    if (!lesson) return <div className="pt-20 text-white">Lesson not found</div>;

    //get main category
    const mainCategory = lesson.mainCategory;
    console.log(mainCategory)

    const conversation = useConversation({
        onConnect: () => console.log('Connected'),
        onDisconnect: () => console.log('Disconnected'),
        onMessage: (message) => console.log('Message:', message),
        onError: (error) => console.error('Error:', error),
    });

    const BACKEND_URL = "http://localhost:5000";

    const [conversationId, setConversationId] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState();
    const [stream, setStream] = useState();
    const [theme, setTheme] = useState(mainCategory);

    async function send_audio() {
        const file = await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${conversationId}/audio`, {
            headers: {
                'xi-api-key': 'sk_ddf785be7922cc7e6979f23e951b2d90b6ff250f0aab79c9'
            }
        });

        console.log("file: ", file);

        try {
            const buffer = await file.arrayBuffer();
            let binary = '';
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            const b64bytes = btoa(binary);
            // console.log("b64bytes")
            const res = await fetch(BACKEND_URL + "/upload_audio", {
                method: 'POST',
                body: JSON.stringify({
                    "audio_file": b64bytes,
                    "theme": mainCategory,
                    "topic": `${lesson.title}, ${lesson.description}`
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });

        } catch (error) {
            console.error('Failed to convert audio to base64:', error);
        }
    }

    async function send_video(b64bytes) {
        const res = await fetch(BACKEND_URL + "/upload_video", {
            method: 'POST',
            body: JSON.stringify({
                "video_file": b64bytes,
                "theme": mainCategory,
                "topic": `${lesson.title}, ${lesson.description}`
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    const agent_id_key_map = {
        "Interview Prep": "NWS4fdecsHKoe5nbLjq2",
        "Casual Talk": "66U0J6hQxRvEZwDw2sh6",
        "Public Speaking": "0vRyGereLyX6c3LRcshz",
        "Debates": "II4aWYOJU9j3CNFTfPPr"
    }

    const prompt_key_map = {
        "Public Speaking": "You are a trainer to produce masters in public speaking. \
                            Try to coach the student's responses to help them appear more persuasive and confident. Keep your responses short UNDER 15 words.",
        "Debates": "You will serve as a debater which will debate against the student. Do not judge the student's responses but produce rebuttals that are convincing and effective. Keep your responses short UNDER 15 words.",
        "Interview Prep": "You are preparing the candidate for their next interview. Do not reveal any feedback about their performance. \
                             Give short questions to learn key traits about the candidate for the company. Keep responses UNDER 15 words.",
        "Casual Talk": "You are a helpful assistant. You are designed to have meaningful conversations with those you talk to. \
                    Try to learn insightful events from the user by asking good questions. Keep responses UNDER 20 words. Be casual.",
    }

    const first_message_key_map = {
        "Interview Prep": "To get more information, what position are you interviewing for?",
        "Debates": "What is the topic of your upcoming debate?",
        "Public Speaking": "What is the topic of your upcoming speech?",
        "Casual Talk": "What do you want to talk about?",
    }

    const startConversation = useCallback(async () => {
        try {
            // Request microphone permission
            const agentId = agent_id_key_map[theme];
            const res = await fetch("https://api.elevenlabs.io/v1/convai/agents/" + agentId, {
                method: 'PATCH',
                headers: {
                    'xi-api-key': 'sk_ddf785be7922cc7e6979f23e951b2d90b6ff250f0aab79c9',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(
                    {
                        "conversation_config": {
                            "agent": {
                                "prompt": {
                                    "prompt": `${prompt_key_map[theme]}. \
                            Please target your question / responses to improve and assess this skill: ${lesson.title}, ${lesson.description}.`,
                                },
                                "first_message": `Hello! Welcome to ${mainCategory} practice. I'll be helping you improve your ${lesson.title} skills by training ${lesson.description} today. \
                        ${first_message_key_map[theme]}`
                            }
                        }
                    }
                )
            });

            let recordedChunks = [];
            //let recordedVideo;
            //let preview;
            await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                .then(stream => {
                    //preview.srcObject = stream;
                    const videoElement = document.querySelector('#myVideo');
                    videoElement.srcObject = stream;
                    setStream(stream);
                    const mediaRecorder = new MediaRecorder(stream);
                    setMediaRecorder(mediaRecorder);
                    mediaRecorder.start();
                    console.log("mediaRecorder started");

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            recordedChunks.push(event.data);
                        }
                    };

                    mediaRecorder.onstop = () => {
                        const blob = new Blob(recordedChunks, { type: 'video/webm' });
                        const fileReader = new FileReader();
                        fileReader.onloadend = async () => {
                            if (typeof fileReader.result === 'string') {
                                const base64String = fileReader.result.split(',')[1];
                                console.log("writing video to backend");
                                await send_video(base64String);
                            }
                        };

                        fileReader.readAsDataURL(blob);
                        //recordedVideo.src = url;
                        //recordedVideo.controls = true; 
                        //downloadLink.href = url;
                        //downloadLink.style.display = 'inline';
                    };
                })
                .catch(error => {
                    console.error('Error accessing the camera:', error);
                });

            //   Start the conversation with your agent
            setConversationId(await conversation.startSession({
                agentId: agentId, // Replace with your agent ID
            }));

            console.log("conversation id: ", conversationId);
        } catch (error) {
            console.error('Failed to start conversation:', error);
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        await conversation.endSession();
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        // setTimeout(async () => {
        //   await send_audio();
        // }, 7000);
    }, [conversation, mediaRecorder]);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-800 to-gray-950 flex flex-col items-center py-8 px-4">
            <div className="max-w-4xl w-full space-y-6 mb-12">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                        {lesson.title} Assessment
                    </h1>
                </div>

                <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-600/50">
                    <p className="text-gray-300 text-center text-lg leading-relaxed">
                        {lesson.description}
                    </p>
                </div>
            </div>

            <div className="max-w-2xl w-full space-y-8">
                <div className="flex justify-center gap-4">
                    <button
                        onClick={startConversation}
                        disabled={conversation.status === "connected"}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-600 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 text-white"
                    >
                        Start Session
                    </button>

                    <button
                        onClick={stopConversation}
                        disabled={conversation.status !== "connected"}
                        className="px-6 py-3 bg-rose-600 hover:bg-rose-500 disabled:bg-gray-600 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 text-white"
                    >
                        End Session
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-white">
                    <div className="bg-gray-700/40 p-4 rounded-xl">
                        <div>
                            <p className="text-sm text-gray-400">Connection Status</p>
                            <p className="font-medium capitalize">
                                <span className={conversation.status === "connected" ? "text-green-400" : "text-red-400"}>
                                    ●
                                </span>
                                {conversation.status}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-700/40 p-4 rounded-xl">
                        <div>
                            <p className="text-sm text-gray-400">Agent is</p>
                            <p className="font-medium">
                                <span className={conversation.isSpeaking ? "text-purple-400" : "text-amber-400"}>
                                    ●
                                </span>
                                {conversation.isSpeaking ? "Speaking" : "Listening"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative bg-gray-900 rounded-xl overflow-hidden border-2 border-gray-700/50 shadow-xl">
                    <video
                        id="myVideo"
                        className="w-full h-64 object-cover"
                        autoPlay
                        muted
                    />

                    {!stream && (
                        <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                            <p className="text-gray-400 text-sm">Camera feed will appear here</p>
                        </div>
                    )}
                </div>

                {conversationId && (
                    <div className="text-center text-sm text-gray-400">
                        Session ID: <span className="font-mono text-cyan-400">{conversationId}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

