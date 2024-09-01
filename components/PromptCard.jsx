import React from 'react'
import Image from 'next/image'

const PromptCard = ({ data }) => {
    return (
        <div className="flex break-inside-avoid flex-col place-content-centerc p-5 rounded-md border-2 w-80 gap-2">
            <div className="flex justify-between items-center">
                <Image src={data.creator.image} width={40} height={40} className='rounded-full'></Image>
                <div className="text-left">
                    <p className="">{data.creator.username}</p>
                    <p className="">{data.creator.email}</p>
                </div>
                <i className="fa-regular fa-copy text-sm p-2 border-2 rounded-full"></i>
            </div>
            <div className="text-justify">{data.prompt}</div>
            <div className="text-left">{data.tag}</div>
        </div>
    )
}

export default PromptCard