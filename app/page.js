'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from './_components/navbar'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
        if (!user.token) {
            router.push('/login')
        }
    
  }, [])

  return (
    <>
      <Navbar/>
    </>
  )
}
