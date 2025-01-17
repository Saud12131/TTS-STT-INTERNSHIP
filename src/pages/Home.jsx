import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Home() {
   let navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button className="bg-red-600 border m-3 text-white p-3 h-[100px] w-[100px]" onClick={()=>navigate("/ttv")}>
                Text-to-Speech
            </button>
            <button className="bg-red-600 border m-3 text-white p-3 h-[100px] w-[100px]" onClick={()=>navigate("/vtt")}>
                Speech-to-Text
            </button>
        </div>

    )
}
