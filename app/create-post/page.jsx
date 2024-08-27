'use client'

import Form from '@components/Form'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreatePrompt = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ post: "", tag: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='w-full sm:px-10 flex place-content-center'>
            <Form type={"Create"} post={post} setPost={setPost} submitting={submitting} handleSubmit={handleSubmit} />
        </div>
    )
}

export default CreatePrompt
