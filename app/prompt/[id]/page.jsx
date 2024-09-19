"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import PromptCard from '@components/PromptCard'
import Loader from '@components/Loader'

const page = ({ params }) => {
    const { data: session } = useSession()
    const [post, setPost] = useState()
    const [loader, setLoader] = useState(true)
    const [comment, setComment] = useState()
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        fetchPrompt()
        setLoader(false)
        setRefresh(false)
    }, [refresh])
    const fetchPrompt = async () => {
        try {
            const resp = await axios.get(`/api/prompt/${params.id}`)
            setPost(resp.data)
            // console.log(resp.data)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const handleAddComment = async (e) => {
        e.preventDefault()
        if (comment) {
            if (session?.user) {
                const payload = {
                    uid: session?.user.id,
                    comment: comment,
                    createdAt: new Date().toUTCString().slice(0, -4)
                }
                const resp = await axios.post(`/api/comment/${params.id}`, payload)
                setComment("")
                toast.success("Comment Added Successfully")
            }
            else {
                toast.warning("You need to be logged in to comment.")
            }

        }
        else {
            toast.warning("Bruh Type some Words !!")
        }
    }
    return (
        <div className="w-full flex place-content-center px-4 sm:px-28 mt-24 mb-28">
            {loader || !post ? <Loader /> : post ? <div className="flex w-full flex-col gap-2">
                {post ? <PromptCard data={post} large={true} /> : ""}
                <div className="w-full flex flex-col gap-2 p-5 border-2 border-white rounded-lg glassmorphism">
                    <div className="">Add Comment</div>
                    <form className='flex items-center justify-center gap-2 sm:gap-4 mb-5'>
                        {session?.user ? <Image src={session?.user?.image} width={35} height={35} className='rounded-full' alt='profile_img' /> : <i class="fa-solid fa-user border-2 border-black p-2 rounded-full"></i>}
                        <input type="text" className='flex-1 rounded-lg outline-none px-3 h-8' placeholder='Add a Comment . . .' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                        <button type='submit' className='border-2 border-white px-4 hover:border-gray-500 h-8 rounded-lg' onClick={handleAddComment}><i class="fa-regular fa-paper-plane"></i></button>
                    </form>
                    <div className="flex w-full justify-between gap-3">
                        <div>Comments [{post.comments.length}]</div>
                        <div className='flex gap-2 items-center border-2 px-2 border-white rounded-lg cursor-pointer' onClick={() => setRefresh(true)}><i class="fa-solid fa-arrows-rotate ml-2 cursor-pointer" ></i>Refresh</div></div>
                    <div className=" flex flex-col w-full gap-3 "
                    >
                        {post?.comments ? post.comments.map(ele =>
                            <div className='w-full flex flex-col gap-2 justify-center-center p-2  border-2 border-white rounded-lg'>
                                <div className="flex gap-2 items-center">
                                    <Image src={ele.uid.image} width={35} height={35} className='rounded-full ' alt='profile_img'></Image>
                                    <div className=" flex flex-col  items-start">
                                        <p className="">{ele.uid?.username[0].toUpperCase() + ele.uid.username.slice(1,)}</p>
                                        <p className='text-xs'>{ele.createdAt}</p>
                                    </div>
                                </div>
                                <div className="text-justify">{ele.comment}</div>
                            </div>
                        ) : <div className="w-full text-center">No Comments</div>}

                    </div>
                </div>
            </div> : ""
            }
        </div >
    )
}

export default page