import React, { useState } from 'react'
import Image from 'next/image'

const PromptCard = ({ data }) => {
    const { creator, prompt, tag } = data
    const [copy, setCopy] = useState(false)

    const handleProfileClick = () => {

    }

    const handleCopy = () => {
        setCopy(true)
        navigator.clipboard.writeText(prompt)
        setTimeout(() => {
            setCopy(false)
        }, (3000));
    }
    return (
        <div className="flex break-inside-avoid flex-col place-content-centerc p-5 rounded-md border-2 w-80 gap-2">
            <div className="flex justify-between items-center">
                <Image src={creator.image} width={40} height={40} className='rounded-full cursor-pointer' onClick={handleProfileClick}></Image>
                <div className="text-left">
                    <p className="font-semibold cursor-pointer hover:underline" onClick={handleProfileClick}>{creator.username}</p>
                    <p className="text-sm">{creator.email}</p>
                </div>
                {copy ? <i class="fa-solid fa-check copy_button bg-green-500"></i> : <i className="fa-regular fa-copy copy_button" onClick={handleCopy}></i>}
            </div>
            <div className="text-justify text-sm">{prompt}</div>
            <div className="text-left text-sm">{tag}</div>
        </div>
    )
}

export default PromptCard