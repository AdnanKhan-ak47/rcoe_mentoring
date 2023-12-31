'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  localStorage.theme = 'light'

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            router.push('/login')
        }
        if(user){
          router.push('/dashboard')
        }
  }, [])

  return (
    <>
    </>
  )
}
