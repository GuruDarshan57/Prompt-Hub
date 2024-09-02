'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import PromptCard from './PromptCard'
import PromptBox from './PromptBox'

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const response = await axios.get("/api/prompt");
        const data = response.data;
        setAllPosts(data.slice(0, 9));
    };



    const handleTagClick = () => {

    }
    return (
        <div className='flex flex-col w-full sm:w-4/5 pt-5 justify-center items-center'>
            <form className='w-full'>
                <input type="text" className='w-11/12 lg:w-3/5 h-10 p-1 rounded-sm outline-none px-3' placeholder='Search for a word, a tag or a username ...' />
            </form>
            <PromptBox data={allPosts} handleTagClick={handleTagClick} />
        </div>
    )
}

export default Feed