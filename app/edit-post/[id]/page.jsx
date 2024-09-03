'use client'

import axios from 'axios'
import Form from '@components/Form'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const EditPrompt = ({ params }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    useEffect(() => {
        session?.user ? fetchPost() : router.replace('/');
    })

    const fetchPost = async () => {
        try {
            const res = await axios.get(`/api/prompt/${params.id}`)
            res.status === 200 ? setPost({ prompt: res.data.prompt, tag: res.data.tag }) : ""
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (post.prompt && post.tag) {
                setSubmitting(true)
                const res = await axios.patch(`/api/prompt/${params.id}`, { ...post, uid: session?.user.id })
                if (res.status == 200) {
                    toast.success("Edited Successfully.")
                    setPost({ prompt: "", tag: "" })
                }
                else {
                    toast.warning(res.data);
                }
            }
            else {
                toast.warning("All fields Mandotory.")
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
            <Form type={"Edit"} post={post} setPost={setPost} submitting={submitting} handleSubmit={handleSubmit} />
        </div>
    )
}

export default EditPrompt
