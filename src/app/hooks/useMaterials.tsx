'use client'
import { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../auth/firebase'

export interface MaterialItem {
  id?: string
  name: string
  image: string
  imagePreview?: string
  color: string
  size: string
  quantity: string
  threshold: string
  productLink?: string
  userId: string
  createdAt?: any
}

export function useMaterials(userId: string | null) {
  const [materials, setMaterials] = useState<MaterialItem[]>([])
  const [loading, setLoading] = useState(true)

  // Load materials for this user
  useEffect(() => {
    if (!userId) {
      setMaterials([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'materials'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: MaterialItem[] = []
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MaterialItem)
      })
      setMaterials(items)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [userId])

  // Add new material
  const addMaterial = async (material: Omit<MaterialItem, 'id' | 'userId' | 'createdAt'>) => {
    if (!userId) throw new Error('User not authenticated')
    
    const docRef = await addDoc(collection(db, 'materials'), {
      ...material,
      userId,
      createdAt: new Date()
    })
    return docRef.id
  }

  // Update material
  const updateMaterial = async (id: string, updates: Partial<MaterialItem>) => {
    await updateDoc(doc(db, 'materials', id), updates)
  }

  // Delete material
  const deleteMaterial = async (id: string) => {
    await deleteDoc(doc(db, 'materials', id))
  }

  return {
    materials,
    loading,
    addMaterial,
    updateMaterial,
    deleteMaterial
  }
}
