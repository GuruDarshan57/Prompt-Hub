"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import PromptCard from '@components/PromptCard'
import Loader from '@components/Loader'

const page = ({ params }) => {
    const { data: session } = useSession()
    const [post, setPost] = useState()
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        fetchPrompt()
        setLoader(false)
    }, [])
    const fetchPrompt = async () => {
        try {
            const resp = await axios.get(`/api/prompt/${params.id}`)
            setPost(resp.data)
            console.log(resp.data)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className="w-full flex place-content-center px-2 sm:px-20 mt-32 mb-28">
            {loader ? <Loader /> : post ? <div className="flex w-full flex-col gap-2">
                {post ? <PromptCard data={post} large={true} /> : ""}
                <div className="w-full flex flex-col gap-2 p-5 border-2 border-white rounded-lg glassmorphism">
                    <div className="">Comments</div>
                    <form className='flex items-center justify-center gap-2 sm:gap-4'>
                        <Image src={post.creator.image} width={40} height={40} className='rounded-full' />
                        <input type="text" className='flex-1 rounded-lg outline-none px-3 h-8' placeholder='Add a Comment . . .' />
                        <button type='submit' className='border-2 border-white px-2 h-8 rounded-lg'><i class="fa-regular fa-paper-plane"></i></button>
                    </form>
                    <div className=""
                    ></div>
                </div>
            </div> : ""}
        </div>
    )
}

export default page