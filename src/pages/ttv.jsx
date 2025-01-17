import { useState } from 'react';
import { Mic } from "lucide-react";

function Ttv() {
    const [text, setText] = useState("");
    const [audio, setAudio] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTextToSpeech = async () => {
        if (!text.trim()) return;

        setIsLoading(true);
        try {
            const apiUrl = `http://api.voicerss.org/?key=32352247c3c64cdd989a10531eff84ad&hl=en-us&src=${encodeURIComponent(text)}`;

            const audioElement = new Audio(apiUrl);
            console.log(audioElement)
            audioElement.addEventListener('error', (e) => {
                console.error('Audio error:', e);
            });

            audioElement.addEventListener('loadeddata', () => {
                setIsLoading(false);
            });

            audioElement.load();
            setAudio(audioElement);
        } catch (error) {
            console.error('Error converting text to speech:', error);
            setIsLoading(false);
        }
    };

    const playAudio = () => {
        if (audio) {
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    };

    const pauseAudio = () => {
        if (audio) {
            audio.pause();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl p-6 space-y-6 bg-white/5 backdrop-blur-lg border border-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-6">
                    <Mic className="w-6 h-6 text-purple-400" />
                    <h1 className="text-2xl font-bold text-white">Text to Speech Converter</h1>
                </div>

                <div className="space-y-4">
                    <textarea
                        placeholder="Enter your text here..."
                        className="w-full min-h-[200px] p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <div className="flex justify-end">
                        <button
                            onClick={handleTextToSpeech}
                            disabled={!text.trim() || isLoading}
                            className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Converting..." : "Convert to Speech"}
                        </button>
                    </div>

                    {audio && (
                        <div className="mt-6 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                            <p className="text-sm text-gray-300 mb-2">Your audio is ready:</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={playAudio}
                                    className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-white rounded-lg"
                                >
                                    Play
                                </button>
                                <button
                                    onClick={pauseAudio}
                                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-white rounded-lg"
                                >
                                    Pause
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Ttv;