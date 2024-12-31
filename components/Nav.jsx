"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { RiHome4Line } from "react-icons/ri";
import { PiSignInFill } from "react-icons/pi";
import { PiSignOutFill } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { HiMiniBars3 } from "react-icons/hi2";

const Nav = () => {
    const { data: session } = useSession()

    const [providers, setProviders] = useState(null)
    const [toggleNav, setToggleNav] = useState(false)

    //Fetch NextAuth Providers
    useEffect(() => {
        const GetProviders = async () => {
            const res = await getProviders();
            setProviders(res)
        }
        GetProviders()
    }, [])
    return (
        <nav className="flex px-6 md:px-10 lg:px-20 justify-center sm:justify-between w-screen p-3 mb-20 items-center">
            <Link href={"/"} className='hidden sm:flex items-center gap-[10px]'>
                <Image src={"/assets/images/logo.png"} width={"40"} height={"40"} alt='Prompt Hub' className='logo_animation'></Image>
                <p className='hidden sm:inline text-xl font-bold font-pacifico tracking-[4px'>Prompt Hub</p>
            </Link>

            {/* Desktop-Navigation */}
            <div className="hidden sm:flex gap-3 items-center">
                <Link className='button_red flex items-center gap-2' href={"/"}><RiHome4Line />Home</Link>
                {session?.user ?
                    <>

                        <Link href={"/create-post"} className='button_red flex gap-2 items-center'><IoCreateOutline />Create New Post</Link>
                        <button onClick={() => { signOut() }} className='button_red flex gap-2 items-center'><PiSignOutFill />SignOut</button>
                        <Link href={"/profile"}><Image src={session.user.image} height={"38"} width={"38"} alt="profile_img" className='rounded-[12px] border-[2px] border-black' /></Link>
                    </>
                    : <>


                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='button_red flex gap-2 items-center'
                                >
                                    <PiSignInFill />Sign in with {provider.name}
                                </button>
                            ))}
                    </>}
            </div>

            {/* Mobile-Navigation */}
            <div className="flex flex-col sm:hidden gap-3 relative w-full">

                <div className='flex justify-between items-center'>
                    <Link href={"/"} className='flex items-center gap-[10px]'>
                        <Image src={"/assets/images/logo.png"} width={"40"} height={"40"} alt='Prompt Hub' className='logo_animation'></Image>
                        <p className='text-xl font-bold font-pacifico tracking-[4px'>Prompt Hub</p>
                    </Link>
                    {toggleNav ? <RxCross2 className='size-7' onClick={() => setToggleNav(false)} /> : <HiMiniBars3 className='size-7' onClick={() => setToggleNav(true)} />}
                </div>
                {toggleNav ? <div className='flex flex-col w-full  gap-3 absolute top-14 z-10 text-center p-4 rounded-2xl glassmorphism border-2 border-white'>
                    {session?.user ? <><Link href={"/"} className='button_red' >Home</Link>
                        <Link href={"/create-post"} className='button_red ' >Create New Post</Link>
                        <Link href={"/profile"} className='button_red' >Profile</Link>
                        <button onClick={() => { signOut() }} className='button_red'>SignOut</button></> : <>
                        <Link className='button_red' href={"/"}>Home</Link>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='button_red'
                                >
                                    Sign in with {provider.name}
                                </button>
                            ))} </>}
                </div> : ""}
            </div>

        </nav>
    )
}

export default Nav