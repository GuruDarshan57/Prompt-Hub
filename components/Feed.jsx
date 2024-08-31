'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div>
            {data?.map(ele => ele.prompt)}
        </div>
    )
}

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const response = await axios.get("/api/prompt");
        const data = response.data;

        setAllPosts(data);
    };



    const handleTagClick = () => {

    }
    return (
        <div className='flex flex-col w-full border-2 pt-5'>
            <form >
                <input type="text" className='w-11/12 lg:w-2/4 p-1 rounded-sm outline-none px-3' placeholder='Search for a word, a tag or a username ...' />
            </form>
            <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
        </div>
    )
}

export default Feed