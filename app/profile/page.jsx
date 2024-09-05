"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import PromptBox from '@components/PromptBox'
import Loader from '@components/Loader'

const Profile = ({ params }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState()
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        session?.user ? fetchData() : router.replace('/');

    }, [])
    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/user/${session?.user.id}/posts`)
            if (res.status === 200) {
                setPosts(res.data)
                setLoader(false)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className="w-full flex flex-col gap-2justify-center items-center mt-32 mb-20 text-center">

            <h2 className="font-bold text-4xl sm:text-6xl">My Profile</h2>
            <p className='w-3/4 text-center mt-3'>"Creativity is intelligence having fun." – Albert Einstein</p>
            {loader ? <Loader /> : <PromptBox data={posts} />}
        </div>
    )
}

export default Profile