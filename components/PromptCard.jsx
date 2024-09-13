import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

const PromptCard = ({ data, handleTagClick, large }) => {
    const { data: session } = useSession()
    const pathname = usePathname()
    const { _id, creator, prompt, tag, likes } = data
    const [copy, setCopy] = useState(false)
    const [like, setLike] = useState(likes.includes(session?.user.id))
    const [nlikes, setNlikes] = useState(likes.length)
    const [save, setSave] = useState(session?.user.saved.includes(_id))

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

    const handleLikeClick = async () => {
        if (session?.user) {
            try {
                const setlike = !like
                setLike(e => !e)
                setNlikes(e => setlike ? e + 1 : e - 1)
                const resp = await axios.post(`/api/like/${_id}`, { uid: session?.user.id, setlike })
            }
            catch (err) {
                console.log(err.messsge)
            }
        }
        else {
            toast.warning("Please SignIn !!")
            return;
        }

    }

    const handleSaveClick = async () => {
        if (session?.user) {
            try {
                const setsave = !save
                setSave(e => !e)
                const resp = await axios.post(`/api/save/${_id}`, { uid: session?.user.id, setsave })
                setsave ? session?.user?.saved.push(_id) : session.user.saved = session.user.saved.filter(ele => ele != _id)
            }
            catch (err) {
                console.log(err.messsge)
            }
        }
        else {
            toast.warning("Please SignIn !!")
            return;
        }

    }

    const handleShareClick = () => {
        navigator.clipboard.writeText(`https://prompt-hub-zeta.vercel.app/prompt/${_id}`)
    }
    return (
        <div className={`flex break-inside-avoid flex-col place-content-centerc p-5 rounded-lg border-2 border-white ${large ? "w-80 sm:w-full" : "w-80 hover:border-gray-500"} gap-3 glassmorphism `} >
            <div className="flex justify-between items-center">
                <div className='flex gap-2'>
                    <Image src={creator.image} width={40} height={40} className='rounded-full cursor-pointer' onClick={handleProfileClick} alt="user profile image"></Image>
                    <div className="text-left">
                        <p className="font-semibold cursor-pointer hover:underline" onClick={handleProfileClick}>{creator.username[0].toUpperCase() + creator.username.slice(1,)}</p>
                        <p className="text-xs">{creator.email}</p>
                    </div>
                </div>
                {copy ? <i class="fa-solid fa-check copy_button bg-green-500"></i> : <i className="fa-regular fa-copy copy_button" onClick={handleCopy}></i>}
            </div>
            <div className="text-justify text-sm">{prompt.slice(0, large ? prompt.length : 150)}{large ? "" : <Link href={`/prompt/${_id}`} className='font-bold'>. . . Read More</Link>}</div>
            <div className="flex text-left text-sm gap-2 mt-2 flex-wrap">
                {tag.split("#").slice(1,).map(ele => <p key={ele} className='p-1 px-2 border-2 border-white rounded-lg cursor-pointer hover:border-gray-500' onClick={() => handleTagClick(ele)}>#{ele}</p>)}
            </div>
            <div className={`flex ${large ? 'flex-start' : "justify-between"} gap-3`}>
                <div className={`flex justify-center items-center gap-2 border-2 ${large ? "w-32" : "flex-1"} border-white rounded-lg cursor-pointer py-[4px] hover:border-gray-500 `} onClick={handleLikeClick}><i className={`fa-${like ? "solid" : "regular"} fa-heart`}></i><p>{nlikes}</p></div>
                <div className={`flex justify-center items-center border-2 ${large ? "w-32" : "flex-1"} border-white rounded-lg cursor-pointer py-[4px] hover:border-gray-500`} onClick={handleShareClick}><i className="fa-solid fa-share"></i></div>
                <div className={`flex justify-center items-center border-2 ${large ? "w-32" : "flex-1"} border-white rounded-lg cursor-pointer py-[4px] hover:border-gray-500`} onClick={handleSaveClick}><i className={`fa-${save ? "solid" : "regular"} fa-bookmark`}></i></div>
            </div>
            {
                session?.user.id === creator._id && pathname === '/profile' ? <div className=" flex justify-between gap-4">
                    <button className='button_red flex-1' onClick={() => { router.push(`/edit-post/${_id}`) }} style={{ borderRadius: "10px" }}>Edit</button>
                    <button className='button_red flex-1' onClick={handleDelete} style={{ borderRadius: "10px" }}>Delete</button>
                </div> : ""
            }
        </div >
    )
}

export default PromptCard