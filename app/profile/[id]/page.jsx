"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const page = ({ params }) => {
  const router = useRouter()
  const [posts, setPosts] = useState()
  useEffect(() => {
    fetchData()
  })
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/user/${params.id}/posts`)
    }
    catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div>{params.id}</div>
  )
}

export default page