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
  })
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
    <div className="w-full flex justify-center items-center">
      <PromptBox data={posts} />
    </div>
  )
}

export default page