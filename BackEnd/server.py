from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from io import BytesIO
import base64
from NEW_TEST import chatBot

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

def base64_to_file(base64_string, filename):
  """
  Converts a Base64-encoded string to a audio file.

  Args:
    base64_string: The Base64-encoded string representing the audio data.
    filename: The desired filename for the output audio file (e.g., "output.wav").

  """
  return BytesIO(base64.b64decode(base64_string))
#   return "data:video/mp4;base64," + base64_string#base64.b64decode(base64_string)
#   with open(filename, "wb") as file:
#     file.write(base64.b64decode(base64_string))


@app.route("/")
@cross_origin(origins="*", allow_headers=['Content-Type', 'Authorization'])
def index():
    return "Hello, World!"

# @app.route("/voiceflow", methods=["POST"])
# def voiceflow():
#     data = request.get_json()["send_data"]
#     print(f"{data=}")
#     return "OK"

@app.route("/upload_audio", methods=["POST"])
@cross_origin(origins="*", allow_headers=['Content-Type', 'Authorization'])
def upload_audio():
    data = request.get_json()
    audio_file = data["audio_file"]
    theme = data["theme"]
    topic = data["topic"]
    print(f"{data=}")
    base64_to_file(audio_file, "test_download.wav")
    if theme == "Interview Prep":
        chatBot.interview_audio_mode("test_download.mp4", topic)
    elif theme == "Casual Talk":
        chatBot.conversational_audio_mode("test_download.mp4", topic)
    elif theme == "Public Speaking":
        chatBot.public_speaking_audio_mode("test_download.mp4", topic)
    elif theme == "Debates":
        chatBot.debate_audio_mode("test_download.mp4", topic)
    return "OK"

@app.route("/upload_video", methods=["POST"])
@cross_origin(origins="*", allow_headers=['Content-Type', 'Authorization'])
def upload_video():
    try: 
        data = request.get_json()
        video_file = data["video_file"]
        theme = data["theme"]
        topic = data["topic"]
        print(f"{data=}")
        bytes = base64_to_file(video_file, "test_download.mp4")
        if theme == "Interview Prep":
            #interview = chatBot.interview_mode("test_download.mp4", topic)
            interview = chatBot.interview_mode(bytes, topic)
            return jsonify(interview)
        elif theme == "Casual Talk":
            #conversation = chatBot.conversational_mode("test_download.mp4", topic)
            conversation = chatBot.conversational_mode(bytes, topic)
            return jsonify(conversation)
        elif theme == "Public Speaking":
            #public_speak = chatBot.public_speaking_mode("test_download.mp4", topic)
            public_speak = chatBot.public_speaking_mode(bytes, topic)
            return jsonify(public_speak)
        elif theme == "Debates":
            #debate = chatBot.debate_mode("test_download.mp4", topic)
            debate = chatBot.debate_mode(bytes, topic)
            return jsonify(debate)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
