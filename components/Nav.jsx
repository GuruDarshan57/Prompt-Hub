"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession()
    const isLogedIn = true
    const [providers, setProviders] = useState(null)
    const [toggleNav, setToggleNav] = useState(false)

    useEffect(() => {
        const GetProviders = async () => {
            const res = await getProviders();
            setProviders(res)
        }
        GetProviders()
    }, [])
    return (
        <nav className="flex justify-center sm:justify-between w-full p-3 mb-20 items-center">
            <Link href={"/"} className='hidden sm:flex items-center gap-[10px]'>
                <Image src={"/assets/images/logo.png"} width={"40"} height={"40"} alt='Prompt Hub'></Image>
                <p className='hidden sm:inline text-xl font-bold'>Prompt Hub</p>
            </Link>

            {/* Desktop-Navigation */}
            <div className="hidden sm:flex gap-3 items-center">
                {session?.user ?
                    <>
                        <Link href={"/create-prompt"} className='px-3 h-9 place-content-center bg-black text-white rounded-3xl tracking-wider border-2 border-black  hover:bg-white hover:text-black'>Create Prompt</Link>
                        <button onClick={() => { signOut() }} className='px-3 h-9 text-black border-2 border-black rounded-3xl tracking-wider hover:bg-black hover:text-white'>SignOut</button>
                        <Link href={"/profile"}><Image src={session.user.image} height={"38"} width={"38"} alt="profile_img" className='rounded-[12px] border-[2.5px] border-black' /></Link>
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
                                    className='black_btn'
                                >
                                    Sign in with {provider.name}
                                </button>
                            ))}
                    </>}
            </div>

            {/* Mobile-Navigation */}
            <div className="flex flex-col sm:hidden gap-3 items-center relative">

                <Image src={"/assets/images/logo.png"} height={"40"} width={"40"} alt="profile_img" onClick={() => setToggleNav((e) => !e)} />
                {toggleNav ? session?.user ? <div className='flex flex-col gap-3 font-bold absolute top-12 z-10 text-center bg-slate-100 px-10 py-3 rounded-3xl'>
                    <Link href={"/"} className='px-3 w-40 h-9 place-content-center rounded-3xl tracking-wider border-2 border-black hover:bg-black hover:text-white'>Home</Link>
                    <Link href={"/create-prompt"} className='px-3 w-40 h-9 place-content-center rounded-3xl tracking-wider border-2 border-black hover:bg-black hover:text-white'>Create Prompt</Link>
                    <Link href={"/profile"} className='px-3 h-9 place-content-center  rounded-3xl tracking-wider border-2 border-black hover:bg-black hover:text-white'>Profile</Link>
                    <button onClick={() => { signOut() }} className='px-3 h-9 text-black border-2 border-black rounded-3xl tracking-wider hover:bg-black hover:text-white'>SignOut</button>
                </div> : providers &&
                Object.values(providers).map((provider) => (
                    <button
                        type='button'
                        key={provider.name}
                        onClick={() => {
                            signIn(provider.id);
                        }}
                        className='black_btn'
                    >
                        Sign in with {provider.name}
                    </button>
                )) : ""}
            </div>

        </nav>
    )
}

export default Nav