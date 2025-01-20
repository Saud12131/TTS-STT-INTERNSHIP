import React, { useState } from "react";
import axios from "axios";

const AudioTranscription = () => {
  const [audio, setAudio] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setloading] = useState(false);
  const handleFileChange = (e) => {
    if (e.target.files) {
      setAudio(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (!audio) {
      alert("Please upload an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audio);

    try {
      const response = await axios.post("http://localhost:5000/api/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTranscription(response.data.transcription);
      console.log(response);
      setloading(false)
    } catch (err) {
      console.error(err);
      alert("Error during transcription.");
      setloading(false)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Audio to Text</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="audio" className="block text-sm font-medium text-gray-600">Upload Audio</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
          >
            {loading ? "Loading.." : " Transcribe"} 
          </button>
        </form>
        {transcription && (
          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-800">Transcription:</h2>
            <p className="text-gray-700 mt-2">{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioTranscription;
