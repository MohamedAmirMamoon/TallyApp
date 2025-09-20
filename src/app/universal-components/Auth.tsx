'use client'
import { useAuth } from '../hooks/useAuth'
import Login from './Login'
interface AuthWrapperProps {
    children: React.ReactNode
  }

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { user, loading } = useAuth()

  console.log('Auth state:', { user, loading })
  console.log('Current children:', children)

  if (loading) return <div>Loading...</div>

  if (!user) {
    console.log('No user, showing login')
    return <Login />
  }

  console.log('User logged in, showing materials page')
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 overflow-hidden">
        {children}  
      </main>
    </div>
  )
}