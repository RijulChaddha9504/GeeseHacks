from flask import Flask, request
from flask_cors import CORS, cross_origin
import base64

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
  with open(filename, "wb") as file:
    file.write(base64.b64decode(base64_string))


@app.route("/")
@cross_origin(origin="*", headers=['Content-Type', 'Authorization'])
def index():
    return "Hello, World!"

# @app.route("/voiceflow", methods=["POST"])
# def voiceflow():
#     data = request.get_json()["send_data"]
#     print(f"{data=}")
#     return "OK"

@app.route("/upload_audio", methods=["POST"])
@cross_origin(origin="*", headers=['Content-Type', 'Authorization'])
def upload_audio():
    data = request.get_json()["audio_file"]
    print(f"{data=}")
    base64_to_file(data, "test_download.wav")
    return "OK"

@app.route("/upload_video", methods=["POST"])
@cross_origin(origin="*", headers=['Content-Type', 'Authorization'])
def upload_video():
    data = request.get_json()["video_file"]
    print(f"{data=}")
    base64_to_file(data, "test_download.mp4")
    return "OK"

if __name__ == "__main__":
    app.run(debug=True)

