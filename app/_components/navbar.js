import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <div className='flex justify-between p-4 bg-[#1C6758] text-gray-300 '>
                <div className=' w-1/3'>
                    <ul className='flex flex-row justify-between '>
                        <li className='hover:text-[#EB6440] focus:border-b-[0.2em] rounded-b-md border-b-orange-500'>
                            <Link href={'/'} >Home</Link>
                        </li>
                        <li className='hover:text-[#EB6440] focus:border-b-[0.2em] rounded-b-md border-b-orange-500'>
                            <Link href={'/problems'} >Problems</Link>
                        </li>
                        <li className='hover:text-[#EB6440] focus:border-b-[0.2em] rounded-b-md border-b-orange-500'>
                            <Link href={'#'} >Mentor</Link>
                        </li>
                        <li >
                            <Link href={'#'} className='hover:text-[#EB6440] focus:border-b-[0.2em] rounded-b-md border-b-orange-500' >About</Link>
                        </li>
                    </ul>
                </div>
                <div className=''>
                    <span className='hover:text-[#EB6440] focus:border-b-[0.2em] rounded-b-md border-b-orange-500 pb-[0.9em]'>Account</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar