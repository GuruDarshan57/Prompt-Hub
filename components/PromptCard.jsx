import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'
import toast from 'react-toastify'

const PromptCard = ({ data }) => {
    const { data: session } = useSession()
    const pathname = usePathname()
    const { _id, creator, prompt, tag } = data
    const [copy, setCopy] = useState(false)

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
    return (
        <div className="flex break-inside-avoid flex-col place-content-centerc p-5 rounded-md border-2 w-80 gap-2">
            <div className="flex justify-between items-center">
                <Image src={creator.image} width={40} height={40} className='rounded-full cursor-pointer' onClick={handleProfileClick}></Image>
                <div className="text-left">
                    <p className="font-semibold cursor-pointer hover:underline" onClick={handleProfileClick}>{creator.username[0].toUpperCase() + creator.username.slice(1,)}</p>
                    <p className="text-sm">{creator.email}</p>
                </div>
                {copy ? <i class="fa-solid fa-check copy_button bg-green-500"></i> : <i className="fa-regular fa-copy copy_button" onClick={handleCopy}></i>}
            </div>
            <div className="text-justify text-sm">{prompt}</div>
            <div className="text-left text-sm">{tag}</div>
            {session?.user.id === creator._id && pathname === '/profile' ? <div className=" flex justify-between gap-4">
                <button className='button_red flex-1' onClick={() => { router.push(`/edit-post/${_id}`) }}>Edit</button>
                <button className='button_red flex-1' onClick={handleDelete}>Delete</button>
            </div> : ""}
        </div>
    )
}

export default PromptCard