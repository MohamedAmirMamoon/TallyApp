'use client'
import { useAuth } from './hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Login from './universal-components/Login'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      // If user is logged in, redirect to materials
      router.push('/materials')
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return <Login />
  }

  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>
}
