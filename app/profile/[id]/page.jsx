"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import PromptBox from '@components/PromptBox'

const page = ({ params }) => {
  const router = useRouter()
  const [posts, setPosts] = useState()
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/user/${params.id}/posts`)
      if (res.status === 200) {
        setPosts(res.data)
        console.log(posts)
      }
    }
    catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center mt-32 mb-20">
      <h2 className="font-bold text-6xl">{posts ? posts[0].creator.username.slice(0, 1).toUpperCase() + posts[0].creator.username.slice(1,) : ""}'s Profile</h2>
      <p className='w-3/4 text-center mt-3'>{`Welcome to ${posts ? posts[0].creator.username : ""}'s Creative Corner! Dive into a world of imagination and explore ${posts ? posts[0].creator.username : ""}'s amazing prompts that are sure to spark your creativity and inspire new ideas. Get ready to be amazed by the magic of their mind`}</p>
      <PromptBox data={posts} />
    </div>
  )
}

export default page