import sys
import whisper

# Check if an audio file is provided as argument
if len(sys.argv) != 2:
    print("Please provide the audio file path.")
    sys.exit(1)

audio_file = sys.argv[1]

# Load the Whisper model (no weights_only argument)
model = whisper.load_model("base")

# Load and transcribe the audio file
result = model.transcribe(audio_file)

# Output the transcription
print(result["text"])
