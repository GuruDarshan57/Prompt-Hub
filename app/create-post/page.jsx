'use client'

import axios from 'axios'
import Form from '@components/Form'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const CreatePrompt = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "", uid: session?.user.id });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (post.prompt && post.tag && post.uid) {
                setSubmitting(true)
                const res = await axios.post("/api/prompt/create", post)
                if (res.status == 200) {

                }
            }
            else {
                console.log("no")
            }




        } catch (err) {
            console.log(err.message)
        }
        finally {
            setSubmitting(false)
        }
    }
    return (
        <div className='w-full sm:px-10 flex place-content-center'>
            <Form type={"Create"} post={post} setPost={setPost} submitting={submitting} handleSubmit={handleSubmit} />
        </div>
    )
}

export default CreatePrompt
