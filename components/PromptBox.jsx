import React from 'react'
import PromptCard from './PromptCard'

const PromptBox = ({ data, handleTagClick }) => {
    return (
        <div className='px-2 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
            {data?.map(ele =>
                <PromptCard data={ele} key={ele._id} handleTagClick={handleTagClick} />
            )}
        </div>
    )
}

export default PromptBox