'use client'

import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { auth } from '../auth/firebase'

type User = {
  email: string
  uid: string
  name?: string
  photoURL?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          email: firebaseUser.email!,
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
          photoURL: firebaseUser.photoURL || undefined
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    
    return () => unsubscribe()
  }, [])
  
  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  // Logout function
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  
  return { user, loading, login, logout }
}