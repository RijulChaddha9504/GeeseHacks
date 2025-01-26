import google.generativeai as genai
#from google import genai
import json
import vertexai
from vertexai.preview.vision_models import ImageGenerationModel

import time

class chatBot:
        def configure_api_key():
                genai.configure(api_key="REPLACE WITH YOUR KEY")

        def interview_audio_mode(audio_fil, topic):
                #genai.configure(api_key="AIzaSyCZVHNl_bOBOHrrEyQuWut89fvuc15P0HQ")
                chatBot.configure_api_key()

                myfile = genai.upload_file(audio_fil)#"decoded_video.mp4")#"petal_20250118_012647.mp4")
                print(f"{myfile=}")

#Videos need to be processed before you can use them.
                while myfile.state.name == "PROCESSING":
                        print("processing video...")
                        time.sleep(5)
                        myfile = genai.get_file(myfile.name)

#prompt = "Analyze the emotions, facial expressions, and body language displayed in this clip. \
 #           Describe ways the person can improve their non verbal communication."

                prompt = f"You are an interview chatbot. Analyze the tone to ensure its formal, emotions, and how the user is showing interest in the company. After grading the user's response, provide a followup question. Make sure the user is staying on this topic: {topic}. Provide short feedback for improvement"
                prompt2 = f"As an interview chatbot, Analyze the tone to ensure its formal, emotions, and how the user is showing interest in the company. Make sure the user is staying on this topic: {topic}. Give them an integer grade from 0-100 regarding how well the user followed these categories. ONLY WRITE ONE INTEGER NUMBER"

                model = genai.GenerativeModel("gemini-1.5-flash")
                result = model.generate_content([myfile, prompt])
                gradeResult = model.generate_content([myfile, prompt2])           

    
    # Print the results

    # Save the results to a JSON file

                interview_data = {
                        "audio_response_analysis": result.text.strip(),
                        "audio_grade": int(gradeResult.text.strip()),  # Ensure the grade is an integer
                } 

                with open("interview_audio_results.json", "w") as json_file:
                        json.dump(interview_data, json_file, indent=4)
    
                print("Interview results saved as interview_audio_results.json")

        #Conversational Agent:
    
        def conversational_audio_mode(audio_fil, topic):
                #genai.configure(api_key="AIzaSyCZVHNl_bOBOHrrEyQuWut89fvuc15P0HQ")
                chatBot.configure_api_key()

                myfile = genai.upload_file(audio_fil)
                print(f"{myfile=}")

#Videos need to be processed before you can use them.
                while myfile.state.name == "PROCESSING":
                        print("processing video...")
                        time.sleep(5)
                        myfile = genai.get_file(myfile.name)

#prompt = "Analyze the emotions, facial expressions, and body language displayed in this clip. \
 #           Describe ways the person can improve their non verbal communication."

                prompt = f"Analyze the tone, emotions, and how engaging the user's voice is. Engage in a conversation with the user by providing them with a question. Provide short feedback for improvement. Make sure the user is staying on this topic: {topic}"
                prompt2 = f"As an conversational chatbot, analyze the tone to ensure the user is interested, emotions, and how the user is showing interest in the conversation. Make sure the user is staying on this topic: {topic}. Give them an integer grade from 0-100 regarding how well the user followed these categories. ONLY WRITE ONE INTEGER NUMBER"

                model = genai.GenerativeModel("gemini-1.5-flash")
                result = model.generate_content([myfile, prompt])
                gradeResult = model.generate_content([myfile, prompt2])           
                print("")
                print(f"{result.text=}")
                print("")
                print(f"{gradeResult.text}")

                conversation_data = {
                        "audio_response_analysis": result.text.strip(),
                        "audio_grade": int(gradeResult.text.strip()),  # Ensure the grade is an integer
                } 
    
                with open("conversation_audio_results.json", "w") as json_file:
                        json.dump(conversation_data, json_file, indent=4)
    
                print("Conversation results saved as conversation_results.json")
    
        def conversational_video_mode(video_fil):
                #genai.configure(api_key="AIzaSyCZVHNl_bOBOHrrEyQuWut89fvuc15P0HQ")
                chatBot.configure_api_key()

                myfile = genai.upload_file(video_fil)
                print(f"{myfile=}")

#Videos need to be processed before you can use them.
                while myfile.state.name == "PROCESSING":
                        print("processing video...")
                        time.sleep(5)
                        myfile = genai.get_file(myfile.name)

#prompt = "Analyze the emotions, facial expressions, and body language displayed in this clip. \
 #           Describe ways the person can improve their non verbal communication."

                prompt = "Only analyze the video and not the audio. You are a conversation chatbot. Analyze the way the user presents them in a conversation by looking at their confidence, body language and posture, and enthusiasm to identify their interest. Give the user feedback of what they can improve afterward"
                prompt2 = "Only analyze the video and not the audio. You are a conversation chatbot. Analyze the way the user presents them in a conversation by looking at their confidence, body language and posture, and enthusiasm to identify their interest Give the user an integer grade from 0-100 regarding how well the user followed these categories. ONLY WRITE ONE INTEGER NUMBER"

                model = genai.GenerativeModel("gemini-1.5-flash")
                result = model.generate_content([myfile, prompt])
                gradeResult = model.generate_content([myfile, prompt2])           
                print("")
                print(f"{result.text=}")
                print("")
                print(f"{gradeResult.text}")

                conversation_data = {
                        "video_response_analysis": result.text.strip(),
                        "video_grade": int(gradeResult.text.strip()),  # Ensure the grade is an integer
                } 
    
                with open("conversation_video_results.json", "w") as json_file:
                        json.dump(conversation_data, json_file, indent=4)
    
                print("Conversation results saved as conversation_video_results.json")
        
        def interview_video_mode(video_fil):
                #genai.configure(api_key="AIzaSyCZVHNl_bOBOHrrEyQuWut89fvuc15P0HQ")
                chatBot.configure_api_key()

                myfile = genai.upload_file(video_fil)
                print(f"{myfile=}")

#Videos need to be processed before you can use them.
                while myfile.state.name == "PROCESSING":
                        print("processing video...")
                        time.sleep(5)
                        myfile = genai.get_file(myfile.name)

#prompt = "Analyze the emotions, facial expressions, and body language displayed in this clip. \
 #           Describe ways the person can improve their non verbal communication."

                prompt = "You are an interview chatbot. Analyze the tone to ensure its formal, emotions, and how the user is showing interest in the company. After grading the user's response, provide a followup question. Provide short feedback for improvement"
                prompt2 = "As an interview chatbot, Analyze the tone to ensure its formal, emotions, and how the user is showing interest in the company. Give them an integer grade from 0-100 regarding how well the user followed these categories. ONLY WRITE ONE INTEGER NUMBER"

                model = genai.GenerativeModel("gemini-1.5-flash")
                result = model.generate_content([myfile, prompt])
                gradeResult = model.generate_content([myfile, prompt2])           
                print("")
                print(f"{result.text=}")
                print("")
                print(f"{gradeResult.text}")

                interview_data = {
                        "video_response_analysis": result.text.strip(),
                        "video_grade": int(gradeResult.text.strip()),  # Ensure the grade is an integer
                } 
    
                with open("interview_video_results.json", "w") as json_file:
                        json.dump(interview_data, json_file, indent=4)
    
                print("Interview results saved as interview_video_results.json")


chatBot.interview_audio_mode("enth_audio.wav", "dinosaur job")
chatBot.conversational_audio_mode("enth_audio.wav", "dinosaurs")