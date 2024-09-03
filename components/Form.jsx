import React from 'react'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <div className="flex flex-col gap-2 w-11/12 md:w-11/12 lg:w-3/4 xl:w-7/12 px-2 sm:px-10 py-5 sm:py-10 rounded-lg glassmorphism mt-24 mb-32 sm:my-0 ">
            <h2 className='text-3xl sm:text-4xl uppercase font-bold' >{type} Post</h2>
            <h4 className='p-1 px-3 hidden sm:inline rounded-full bg-red-200 '>A prompt is the spark that ignites the fire of imagination.</h4>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 px-1'>
                <label className='font-normal'>Your AI Prompt</label>
                <textarea name="" id="" className='min-h-44 rounded-md p-1 px-2 outline-none bg-gray-50' placeholder='Enter Your Prompt here ... ' value={post.prompt} onChange={(e) => { setPost({ ...post, prompt: e.target.value }) }}></textarea>
                <label htmlFor="">Tags <span className='text-slate-600 text-sm'>[#web, #tech, #study, #gpt, #summary]</span></label>
                <input type="text" className='h-10 rounded-md p-1 px-2 outline-none bg-gray-50' placeholder='Enter Your Tags here ... ' value={post.tag} onChange={(e) => { setPost({ ...post, tag: e.target.value }) }} />
                <button disabled={submitting} type="submit" className='button_red w-44 mt-2' onClick={handleSubmit}>{type} Post</button>
            </form>
        </div>
    )
}

export default Form