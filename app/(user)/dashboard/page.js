'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Dashoard = () => {
    const router = useRouter()

    useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            router.push('/login')
        }
    
    }, [])
    return (
        <div>Dashoard</div>
    )
}

export default Dashoard