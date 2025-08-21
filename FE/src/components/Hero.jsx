import axios from 'axios';
import React, { useState } from 'react'
import QRCode from "react-qr-code";

const Hero = () => {
    const [customCode,setCustomCode] = useState("");
    const [requireCustomCode, setRequireCustomCode] = useState(false)
    const [originalURL, setOriginalURL] = useState("")
    const [shortenURL, setShortenURL] = useState("")

    const handleClick = async () =>{
        if(!originalURL){
        console.error("Original URL is required.");
        return;
        }

        try {

            let response
            if(customCode){
                response = await axios.post("http://localhost:3000/shorten",{
                    url: originalURL,
                    customCode: customCode
                });
            }else{
                response = await axios.post("http://localhost:3000/shorten",{
                    url: originalURL
                });
                }

                setShortenURL(response.data.shorten_url)
            
        } catch (error) {
            console.error("Error creating short URL:", error);
        }
    }


  return (
    <div className="flex flex-col flex-grow h-[95%]">
        <div className="flex flex-col h-fit items-center mx-auto mt-5">
            <div className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Shorten URLs with Style</div>
            <div className="text-xl max-w-2xl mx-auto text-[#a1a1a1]">Transform long URLs into sleek, shareable links with our futuristic URL shortener. Generate QR codes instantly and track your links with ease.</div>
        </div>
        <div className={`flex flex-row ${customCode ? 'justify-between' : 'justify-center'} px-10 mt-15 gap-15`}>
            <div className="w-full max-w-xl">
                <div className="border-1 border-[#f9e86663] rounded-lg px-10 flex flex-col gap-6 py-10">
                    <div className="flex flex-row items-center gap-4">
                        <div className="size-6 text-[#f9e866]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg></div>
                        <div className="text-2xl font-bold">Shorten Your URL</div>
                    </div>
                    <input type="text" className='border border-[#f9e86663] rounded-md w-full px-3 py-5 focus:border-[#f9e866] focus:border-2 focus:outline-none'  placeholder='Enter your URL here...' value={originalURL} onChange={(e)=>setOriginalURL(e.target.value)}/>
                    <label className='flex gap-4'> <input type="checkbox" className='h-6 w-6 rounded-md border-[#f9e866] border-2 bg-transparent' checked={requireCustomCode} onChange={()=>setRequireCustomCode(!requireCustomCode)}/>
                    <span className='cursor-pointer'>Use custom code</span>
                    </label>
                    {requireCustomCode && <input type="text" className='border border-[#f9e86663] rounded-md w-full px-3 py-3 focus:border-[#f9e866] focus:border-2 focus:outline-none'  placeholder='Enter your custom short code...' value={customCode} onChange={(e)=>setCustomCode(e.target.value)}/>}
                    <button className='bg-[#f9e866] px-4 py-6 rounded-md flex flex-row items-center text-black gap-4 justify-center cursor-pointer hover:bg-[#f9e866de]' onClick={handleClick}>
                        <div className="size-4 text-black"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
                        <span className='font-bold'>Shorten URL</span>
                    </button>
                </div>
            </div>
            {shortenURL && <div className="w-full max-w-2xl">
                <div className="border-1 border-[#9cf9668d] rounded-lg px-10 flex flex-col gap-6 py-10">
                    <div className="">
                        <div className="text-2xl font-bold">Your Shortened URL</div>
                    </div>
                    <div className="border-1 border-[#9cf9668d] px-4 py-2 rounded-md flex flex-row items-center">
                        <input type="text" className='w-full py-5 border-none focus:outline-none text-xl' readOnly value={shortenURL}/>
                        <div className="cursor-pointer w-[10%] h-full mx-auto hover:text-[#7aff2dd0]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></div>
                    </div>
                    <div className="mx-auto mt-5 bg-white p-5">
                        <div className="">
                            <QRCode value={shortenURL}></QRCode>
                        </div>
                    </div>
                    <div className="mx-auto">Scan this to get shorten url</div>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default Hero