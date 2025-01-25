import google.generativeai as genai
#from google import genai
import os

import vertexai
from vertexai.preview.vision_models import ImageGenerationModel

import time

### Video to Text Generation using Google Gemini

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

myfile = genai.upload_file("enth_audio.wav")#"decoded_video.mp4")#"petal_20250118_012647.mp4")
print(f"{myfile=}")

# Videos need to be processed before you can use them.
while myfile.state.name == "PROCESSING":
    print("processing video...")
    time.sleep(5)
    myfile = genai.get_file(myfile.name)

#prompt = "Analyze the emotions, facial expressions, and body language displayed in this clip. \
 #           Describe ways the person can improve their non verbal communication."

prompt = "Analyze the tone, emotions, and how engaging the user's voice is. Provide short feedback for improvement."

model = genai.GenerativeModel("gemini-1.5-flash")
result = model.generate_content([myfile, prompt])
print(f"{result.text=}")
