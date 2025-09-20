'use client'

import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from '../universal-components/Sidebar'
import MatComponent from './matcomponent/MatComponent'

export default function Materials() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'inventory' | 'orderQueue'>('inventory')

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="flex h-screen bg-[#F2F2F2]">
      <Sidebar user={user} />
      <div className="flex-1 overflow-auto">
        <MatComponent />
      </div>
    </div>
  );
}
