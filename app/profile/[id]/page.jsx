"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Loader from '@components/Loader'
import PromptBox from '@components/PromptBox'

const page = ({ params }) => {
  const router = useRouter()
  const [posts, setPosts] = useState()
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/user/${params.id}/posts`)
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
    <div className="w-full flex flex-col gap-2 justify-center items-center mt-32 mb-20 text-center">
      <h2 className="font-bold text-4xl sm:text-6xl ">{posts ? posts[0].creator.username.slice(0, 1).toUpperCase() + posts[0].creator.username.slice(1,) : ""}'s Profile</h2>
      <p className='hidden sm:inline w-3/4 mt-3'>{`Welcome to ${posts ? posts[0].creator.username : ""}'s Creative Corner! Dive into a world of imagination and explore ${posts ? posts[0].creator.username : ""}'s amazing prompts that are sure to spark your creativity and inspire new ideas. Get ready to be amazed by the magic of their mind`}</p>
      <p className='sm:hidden w-3/4 mt-3'>{`Welcome to ${posts ? posts[0].creator.username : ""}'s Creative Corner!`}</p>
      {loader ? <Loader /> : <PromptBox data={posts} />}
    </div>
  )
}

export default page