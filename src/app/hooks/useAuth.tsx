'use client'

import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, User as FirebaseUser } from 'firebase/auth'
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
    if (!auth) {
      setLoading(false)
      return
    }
    
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
    if (!auth) {
      throw new Error('Firebase not initialized')
    }
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
    if (!auth) {
      return
    }
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  
  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    if (!auth) {
      throw new Error('Firebase not initialized')
    }
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, {
        displayName: name
      })
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  return { user, loading, login, logout, signup }
}