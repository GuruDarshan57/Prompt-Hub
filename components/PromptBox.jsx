import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptBox = ({ data, handleTagClick }) => {
    return (
        <div className='px-2 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
            {data?.map(ele =>
                <PromptCard data={ele} key={ele._id} handleTagClick={handleTagClick} />
            )}{
                data.length == 0 ? <><p></p> <p className='border-2 border-white px-4 p-1 rounded-lg glassmorphism'>No Prompt Found !!</p> </> : ""
            }

        </div>
    )
}

export default PromptBox