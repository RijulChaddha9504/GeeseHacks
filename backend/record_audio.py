import pyaudio
import wave

# Define audio parameters
FORMAT = pyaudio.paInt16  # Audio format
CHANNELS = 1  # Number of channels (mono)
RATE = 44100  # Sample rate
CHUNK = 1024  # Block size

# Initialize PyAudio object
audio = pyaudio.PyAudio()

# Open microphone stream
stream = audio.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

print("Recording...")

# Create an empty byte array to store the recorded audio
frames = []

# Record audio for a specific duration (e.g., 5 seconds)
try:
    for i in range(0, int(RATE / CHUNK * 5)):  # Record for 5 seconds
        data = stream.read(CHUNK)
        frames.append(data)
except KeyboardInterrupt:
    print("Recording stopped by user")

print("Finished recording.")

# Stop and close the audio stream
stream.stop_stream()
stream.close()
audio.terminate()

# Save the recorded audio to a WAV file
waveFile = wave.open("enth_audio.wav", 'wb')
waveFile.setnchannels(CHANNELS)
waveFile.setsampwidth(audio.get_sample_size(FORMAT))
waveFile.setframerate(RATE)
waveFile.writeframes(b''.join(frames))
waveFile.close()

print("Audio saved to recorded_audio.wav")