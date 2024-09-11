import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

const PromptCard = ({ data, handleTagClick }) => {
    const { data: session } = useSession()
    const pathname = usePathname()
    const { _id, creator, prompt, tag } = data
    const [copy, setCopy] = useState(false)
    const [fav, setFav] = useState(session?.user.fav.includes(_id))

    const router = useRouter();

    const handleProfileClick = () => {
        creator._id === session?.user.id ? router.push('/profile') : router.push(`/profile/${creator._id}`)
    }

    const handleCopy = () => {
        setCopy(true)
        navigator.clipboard.writeText(prompt)
        setTimeout(() => {
            setCopy(false)
        }, (3000));
    }
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/api/prompt/${_id}`)
            if (res.status === 200) {
                toast.success("Post Deleted Successfully")
            }
        } catch (err) {
            console.log(err.messsge)
        }
    }

    const handleFavClick = async () => {
        session?.user ? "" : toast.warning("Please SignIn !!")
        try {
            const resp = await axios.post(`/api/fav/${_id}`, { uid: session?.user.id, fav: !fav })
            resp.status === 200 ? setFav(e => !e) : ""
        }
        catch (err) {
            console.log(err.messsge)
        }
    }
    return (
        <div className="flex break-inside-avoid flex-col place-content-centerc p-5 rounded-lg border-2 border-white w-80 gap-2 glassmorphism hover:border-gray-500" >
            <div className="flex justify-between items-center">
                <Image src={creator.image} width={40} height={40} className='rounded-full cursor-pointer' onClick={handleProfileClick} alt="user profile image"></Image>
                <div className="text-left relative -left-2">
                    <p className="font-semibold cursor-pointer hover:underline" onClick={handleProfileClick}>{creator.username[0].toUpperCase() + creator.username.slice(1,)}</p>
                    <p className="text-xs">{creator.email}</p>
                </div>
                {copy ? <i class="fa-solid fa-check copy_button bg-green-500"></i> : <i className="fa-regular fa-copy copy_button" onClick={handleCopy}></i>}
            </div>
            <div className="text-justify text-sm">{prompt}</div>
            <div className="flex text-left text-sm gap-2 mt-2 flex-wrap">
                {tag.split("#").slice(1,).map(ele => <p key={ele} className='p-1 px-2 border-2 border-white rounded-lg cursor-pointer hover:border-gray-500' onClick={() => handleTagClick(ele)}>#{ele}</p>)}
            </div>
            <div className="flex justify-between gap-2">
                <div className="border-2 flex-1 border-white rounded-lg cursor-pointer py-[2px] hover:border-gray-500">{true ? <i className="fa-regular fa-thumbs-up"></i> : <i className="fa-solid fa-thumbs-up"></i>}</div>
                <div className="border-2 flex-1 border-white rounded-lg cursor-pointer py-[2px] hover:border-gray-500">{true ? <i className="fa-regular fa-thumbs-down"></i> : <i className="fa-solid fa-thumbs-down"></i>}</div>
                <div className="border-2 flex-1 border-white rounded-lg cursor-pointer py-[2px] hover:border-gray-500" onClick={handleFavClick}><i className={`fa-${fav ? "solid" : "regular"} fa-heart`}></i></div>
                <div className="border-2 flex-1 border-white rounded-lg cursor-pointer py-[2px] hover:border-gray-500"><i className="fa-solid fa-arrow-up-from-bracket"></i></div>
            </div>
            {session?.user.id === creator._id && pathname === '/profile' ? <div className=" flex justify-between gap-4">
                <button className='button_red flex-1' onClick={() => { router.push(`/edit-post/${_id}`) }} style={{ borderRadius: "10px" }}>Edit</button>
                <button className='button_red flex-1' onClick={handleDelete} style={{ borderRadius: "10px" }}>Delete</button>
            </div> : ""}
        </div>
    )
}

export default PromptCard