'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message : any) => console.log('Message:', message),
    onError: (error : any) => console.error('Error:', error),
  });

  const BACKEND_URL = "http://localhost:5000";

  const [conversationId, setConversationId] = useState("");

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
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });

      } catch (error) {
        console.error('Failed to convert audio to base64:', error);
      }
  }

  const startConversation = useCallback(async () => {
    try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });

        //   Start the conversation with your agent
        setConversationId(await conversation.startSession({
            agentId: '66U0J6hQxRvEZwDw2sh6', // Replace with your agent ID
        }));
      
        console.log("conversation id: ", conversationId); 
    } catch (error) {
        console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setTimeout(async () => {
      await send_audio();
    }, 3000);
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
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
      </div>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
      </div>
    </div>
  );
}
