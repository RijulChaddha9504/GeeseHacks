"use client";

import { useSearchParams } from 'next/navigation';
import { lessonData } from '../learn/lessonData';
import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';

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

    if (!lesson) {
        console.log("lesson not found");
        return <div className="pt-20">Lesson not found</div>;
    }

    const conversation = useConversation({
        onConnect: () => console.log('Connected'),
        onDisconnect: () => console.log('Disconnected'),
        onMessage: (message) => console.log('Message:', message),
        onError: (error) => console.error('Error:', error),
    });

  const BACKEND_URL = "http://localhost:5000";

  const [conversationId, setConversationId] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null);
  const [stream, setStream] = useState<MediaStream>(null);
  const [theme, setTheme] = useState<string>("interview");

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
            "theme": theme,
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
        "theme": theme,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
  const startConversation = useCallback(async () => {
    try {
        // Request microphone permission
        const agentId = theme == "conversational" ? '66U0J6hQxRvEZwDw2sh6' : 'NWS4fdecsHKoe5nbLjq2';
        await fetch("https://api.elevenlabs.io/v1/convai/agents/" + agentId, {
            method: 'PATCH',
            headers: {
                'xi-api-key': 'sk_ddf785be7922cc7e6979f23e951b2d90b6ff250f0aab79c9', 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "prompt": `You are preparing the candidate for their next interview. Do not reveal any feedback about their performance. \
                                Please target your question to improve and assess this skill: ${lesson.title}, ${lesson.description}. \
                             Give short questions to learn key traits about the candidate for the company. Keep responses UNDER 15 words.`,
            })
        });
        let recordedChunks = [];
        //let recordedVideo;
        //let preview;
        await navigator.mediaDevices.getUserMedia({ audio: true, video : true })
        .then(stream => {
          //preview.srcObject = stream;
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
    setTimeout(async () => {
      await send_audio();
    }, 7000);
  }, [conversation, mediaRecorder]);

    return (
        <div className="w-full h-screen bg-gradient-to-br from-gray-800 to-gray-950 flex flex-col items-center pt-16">
            <div className="flex flex-col items-center mt-20"> 
                <h1 className="text-white">{lesson.title} Assessment</h1>
                <p className="text-white">{lesson.description}</p>

                {/* <button
                    onClick={startConversation}
                    disabled={conversation.status === 'connected'}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Start Conversation
                </button>
                <button
                    onClick={stopConversation}
                    disabled={conversation.status !== 'connected'}
                    className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
                >
                    Stop Conversation
                </button>
                <div className="flex flex-col items-center">
                    <p>Status: {conversation.status}</p>
                    <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
                </div> */}
            </div>
        </div>
    );
}

export default AssessmentPage