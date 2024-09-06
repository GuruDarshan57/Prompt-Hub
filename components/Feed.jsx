'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import PromptCard from './PromptCard'
import PromptBox from './PromptBox'
import Loader from './Loader'
import { useRouter } from 'next/navigation'

const Feed = () => {
    const router = useRouter()
    const [allPosts, setAllPosts] = useState([]);
    const [loader, setLoader] = useState(true)
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const res = await axios.get("/api/prompt");
            const data = res.data;
            if (res.status === 200) {
                setAllPosts(data);
                setLoader(false)
            }
            else {
                router.refresh()
            }
        }
        catch (err) {
            console.log(err.message)
        }
    };

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (searchTag) => {
        setSearchText(searchTag);
        console.log(searchTag)
        const searchResult = filterPrompts(searchTag);
        setSearchedResults(searchResult);
    };


    return (
        <div className='flex flex-col w-full sm:w-4/5 pt-5 justify-center items-center'>
            <form className='w-full'>
                <input type="text" className='w-11/12 lg:w-3/5 h-10 p-1 rounded-sm outline-none px-3' placeholder='Search for a word, a tag or a username ...' value={searchText} onChange={handleSearchChange} />
            </form >
            {loader ? <Loader /> : <PromptBox data={searchText ? searchedResults : allPosts} handleTagClick={handleTagClick} />}
        </div >
    )
}

export default Feed