'use client';

import { Dropdown } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { HiCog, HiLogout } from 'react-icons/hi';

export default function AccountDropdown() {
    const router = useRouter()

        const user = (JSON.parse(localStorage.getItem('user')))?.user

    

    const signOut = () => {
        localStorage.removeItem('user')
        router.push('/login')
    }
    return (
        <Dropdown label="Dropdown" class='hover:text-[#EB6440]' color='#1C6758' >
            <Dropdown.Header>
                <span className="block text-sm">
                    {user?.name}
                </span>
                <span className="block truncate text-sm font-medium">
                    {user?.email}
                </span>
            </Dropdown.Header>
            {/* <Dropdown.Item icon={HiViewGrid}>
                Dashboard
            </Dropdown.Item> */}
            <Dropdown.Item icon={HiCog}>
                Settings
            </Dropdown.Item>
            {/* <Dropdown.Item icon={HiCurrencyDollar}>
                Earnings
            </Dropdown.Item> */}
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={signOut}>
                Sign out
            </Dropdown.Item>
        </Dropdown>
    )
}




