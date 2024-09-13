"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PromptCard from '@components/PromptCard'
import Loader from '@components/Loader'

const page = ({ params }) => {
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
        <div className="w-full flex place-content-center px-20 mt-32 mb-28">
            {loader ? <Loader /> : post ? <div className="flex flex-col gap-2">
                {post ? <PromptCard data={post} large={true} /> : ""}
                <div className="w-full p-5 border-2 border-white rounded-lg glassmorphism">
                    <div className="">Comments</div>
                </div>
            </div> : ""}
        </div>
    )
}

export default page