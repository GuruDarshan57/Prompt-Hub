'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PromptBox from './PromptBox'
import Loader from './Loader'

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [loader, setLoader] = useState(true)
    const [refetchStatus, setRefetchStatus] = useState(false)
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    //Fetching all the posts
    useEffect(() => {
        fetchPosts()
    }, [refetchStatus])

    //Function to fetch all the posts
    const fetchPosts = async () => {
        try {
            const res = await axios.get("/api/prompt");
            const data = res.data;
            if (res.status === 200) {
                setAllPosts(data);
                setLoader(false)
            }
            else {
                setRefetchStatus((e) => !e)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    };

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i");
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
            <form className='flex justify-center items-center w-full relative'>
                <input type="text" className='w-[95%] lg:w-3/5 h-10 p-1 rounded-lg outline-none px-3' placeholder='Search for a word, a tag or a username ...' value={searchText} onChange={handleSearchChange} />
                {searchText ? <i className="fa-solid fa-circle-xmark text-xl absolute sm:relative right-4 sm:right-7 cursor-pointer" onClick={() => { setSearchText("") }}></i> : ""}
            </form >
            {loader ? <Loader /> : <PromptBox data={searchText ? searchedResults : allPosts} handleTagClick={handleTagClick} />}
        </div >
    )
}

export default Feed