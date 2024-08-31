import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='flex w-screen place-content-center footer absolute bottom-3'>
            <div className='flex flex-col sm:flex-row w-full px-6 md:px-10 lg:px-24 justify-between'>
                <Link href={'/'} className='flex font-pacifico place-content-center'>
                    Prompt Hub
                </Link>
                <div className='flex gap-4 place-content-center mt-2 sm:mt-0'>
                    <Link href="https://github.com/GuruDarshan57" target="_blank"><i className="fa-brands fa-square-git text-2xl cursor-pointer"  ></i></Link>
                    <Link href="https://www.linkedin.com/in/gurudarshan-l-772a1b25b/" target="_blank"><i className="fa-brands fa-linkedin text-2xl cursor-pointer"></i></Link>
                </div>
                <div className='flex mt-2 sm:mt-0 tracking-wider font-medium place-content-center'>
                    Copyright © {new Date().toString().slice(10, 15)} GuruDarshan
                </div>
            </div>
        </div>
    )
}

export default Footer