import google.generativeai as genai
#from google import genai
import json
import os
import time

class chatBot:
        def configure_api_key():
                genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

        def interview_mode(audio_fil, topic):
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

                prompt = f"You are an interview chatbot. Analyze the tone to ensure its formal, emotions, and how the user is showing interest in the company. Make sure the user is staying on this topic: {topic}. Provide short feedback for improvement. Also analyze the professionalism in the user's video such as their clothing, body language, and confidence to see whether they are a good candidate. Give the user feedback about areas they can improve on"
                prompt2 = f"You are an interview chatbot. Analyze the tone to ensure its formal, emotions, and how the user is showing interest in the company. Make sure the user is staying on this topic: {topic}. Also analyze the professionalism in the user's video such as their clothing, body language, and confidence to see whether they are a good candidate. Give them an integer grade from 0-100 based on how well they followed these categories.  ONLY WRITE ONE INTEGER NUMBER FOR THE OUTPUT"

                model = genai.GenerativeModel("gemini-1.5-flash")
                result = model.generate_content([myfile, prompt])
                gradeResult = model.generate_content([myfile, prompt2])           

    
    # Print the results

    # Save the results to a JSON file

                interview_data = {
                        "response_analysis": result.text.strip(),
                        "grade": int(gradeResult.text.strip()),  # Ensure the grade is an integer
                } 

                with open("interview_results.json", "w") as json_file:
                        json.dump(interview_data, json_file, indent=4)

    
                print("Interview results saved as interview_results.json")

                return interview_data

        #Conversational Agent:
    
        def conversational_mode(audio_fil, topic):
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

                prompt = f"Analyze the tone, emotions, and how engaging the user's voice is. Provide short feedback for improvement. Make sure the user is staying on this topic: {topic}. In the video, analyze the way the user presents them in a conversation by looking at their confidence, body language and posture, and enthusiasm to identify their interest. Give the user feedback of what they can improve afterward"
                prompt2 = f"Analyze the tone, emotions, and how engaging the user's voice is. Make sure the user is staying on this topic: {topic}. In the video, analyze the way the user presents them in a conversation by looking at their confidence, body language and posture, and enthusiasm to identify their interest. Give them an integer grade from 0-100 based on how well they followed these categories.  ONLY WRITE ONE INTEGER NUMBER FOR THE OUTPUT"

                model = genai.GenerativeModel("gemini-1.5-flash")
                result = model.generate_content([myfile, prompt])
                gradeResult = model.generate_content([myfile, prompt2])           

                conversation_data = {
                        "response_analysis": result.text.strip(),
                        "grade": int(gradeResult.text.strip()),  # Ensure the grade is an integer
                } 
    
                with open("conversation_results.json", "w") as json_file:
                        json.dump(conversation_data, json_file, indent=4)
    
                print("Conversation results saved as conversation_results.json")

                return conversation_data
        
        def public_speaking_mode(audio_fil, topic):
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

                prompt = f"In audio, analyze the user's tone, emotions, clarity, and overall vocal engagement as they present their ideas. Provide constructive feedback on their delivery, including voice modulation, pacing, and how engaging their speech is. In video, evaluate the user's body language, posture, facial expressions, eye contact, and hand gestures to assess how effectively they convey confidence and connect with their audience. Provide constructive feedback on these aspects and suggest improvements. Ensure the feedback align with the given topic: {topic}."
                prompt2 = f"In audio, analyze the user's tone, emotions, clarity, and overall vocal engagement as they present their ideas. Provide constructive feedback on their delivery, including voice modulation, pacing, and how engaging their speech is. In video, evaluate the user's body language, posture, facial expressions, eye contact, and hand gestures to assess how effectively they convey confidence and connect with their audience. Make sure the user's conversation stays alligned to this topic: {topic}. Give them an integer grade from 0-100 based on how well they followed these categories.  ONLY WRITE ONE INTEGER NUMBER FOR THE OUTPUT"

                model = genai.GenerativeModel("gemini-1.5-flash")
                result = model.generate_content([myfile, prompt])
                gradeResult = model.generate_content([myfile, prompt2])           

                public_data = {
                        "response_analysis": result.text.strip(),
                        "grade": int(gradeResult.text.strip()),  # Ensure the grade is an integer
                } 
    
                with open("public_speaking_results.json", "w") as json_file:
                        json.dump(public_data, json_file, indent=4)
    
                print("Public Speaking results saved as public_speaking_results.json")

                return public_data

        def debate_mode(audio_fil, topic):
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

                prompt = f"In audio, analyze the user's tone, emotions, clarity, and overall vocal engagement as they present their arguments. Provide constructive feedback on their delivery, including voice modulation, pacing, and how persuasively they convey their points. In video, evaluate the user's body language, posture, facial expressions, eye contact, and hand gestures to assess how effectively they assert their position and engage with their opponent. Focus on the user's ability to remain composed, confident, and persuasive under pressure. Provide feedback on these aspects and suggest improvements. Ensure the feedback aligns with the given topic: {topic}."
                prompt2 = f"In audio, analyze the user's tone, emotions, clarity, and overall vocal engagement as they present their arguments. Provide constructive feedback on their delivery, including voice modulation, pacing, and how persuasively they present their points. In video, evaluate the user's body language, posture, facial expressions, eye contact, and hand gestures to assess how effectively they assert their position and engage with their opponent. Focus on their ability to remain composed, confident, and persuasive under pressure. Make sure the user's debate stays aligned with this topic: {topic}. Give them an integer grade from 0-100 based on how well they followed these categories.  ONLY WRITE ONE INTEGER NUMBER FOR THE OUTPUT"

                model = genai.GenerativeModel("gemini-1.5-flash")
                result = model.generate_content([myfile, prompt])
                gradeResult = model.generate_content([myfile, prompt2])           

                public_data = {
                        "response_analysis": result.text.strip(),
                        "grade": int(gradeResult.text.strip()),  # Ensure the grade is an integer
                } 
    
                with open("debate_results.json", "w") as json_file:
                        json.dump(public_data, json_file, indent=4)
    
                print("Debate Speaking results saved as debate_results.json")

                return public_data


# chatBot.public_speaking_mode("decoded_video.mp4", "dinosaurs")
# chatBot.conversational_mode("decoded_video.mp4", "dinosaurs")
# chatBot.debate_mode("decoded_video.mp4", "dinosaurs")
# chatBot.interview_mode("decoded_video.mp4", "dinosaurs")
