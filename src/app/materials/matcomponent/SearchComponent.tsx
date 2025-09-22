'use client'
import Image from "next/image";
import { useState } from "react";
import MaterialForm from "./MaterialForm";
import BlankItem from "../blankitem/BlankItem";
import { useMaterials, MaterialItem } from "../../hooks/useMaterials";
import { useAuth } from "../../hooks/useAuth";

export default function MatComponent() {
    const { user } = useAuth()
    const { materials, loading, addMaterial, updateMaterial } = useMaterials(user?.uid || null)
    const [formOpen, setFormOpen] = useState(false);
    const [sortBy, setSortBy] = useState<'date' | 'quantity'>('date');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
    const [searchTerm, setSearchTerm] = useState('');

    const handleItemsAdded = async (formData: MaterialItem) => {
        if (!user?.uid) {
            alert('You must be logged in to add materials')
            return
        }
        
        try {
            await addMaterial({
                name: formData.name,
                image: formData.image || formData.imagePreview || '',
                imagePreview: formData.imagePreview || '',
                imageFile: formData.imageFile,
                color: formData.color,
                size: formData.size,
                quantity: formData.quantity,
                threshold: formData.threshold,
                productLink: formData.productLink || '',
            })
        } catch (error) {
            console.error('Failed to add material:', error)
            alert('Failed to save material. Please try again.')
        }
    }

    const handleAddNew = () => {
        setFormOpen(true)
    }

    const handleChangeQuantity = async (index: number, delta: number) => {
        const item = sortedMaterials[index]
        if (!item?.id) return
        
        const nextQty = Math.max(0, Number(item.quantity || 0) + delta)
        try {
            await updateMaterial(item.id, { quantity: String(nextQty) })
        } catch (error) {
            console.error('Failed to update quantity:', error)
        }
    }

    const handleDateSortToggle = () => {
        setSortBy('date')
        setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')
    }

    const handleQuantitySortToggle = () => {
        setSortBy('quantity')
        setSortOrder(prev => prev === 'highest' ? 'lowest' : 'highest')
    }

    // filtering off termss
    const filteredMaterials = materials.filter(material => {
        if (!searchTerm.trim()) return true;
        
        const searchLower = searchTerm.toLowerCase();
        return (
            material.name.toLowerCase().includes(searchLower) ||
            material.color.toLowerCase().includes(searchLower) ||
            material.size.toLowerCase().includes(searchLower) ||
            material.quantity.toLowerCase().includes(searchLower) ||
            material.threshold.toLowerCase().includes(searchLower)
        );
    });

    // sort materials based on current sort type and order
    const sortedMaterials = [...filteredMaterials].sort((a, b) => {
        if (sortBy === 'date') {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0)
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0)
            
            if (sortOrder === 'newest') {
                return dateB.getTime() - dateA.getTime() // newest
            } else {
                return dateA.getTime() - dateB.getTime() //oldest
            }
        } else {
            const quantityA = Number(a.quantity) || 0
            const quantityB = Number(b.quantity) || 0
            
            if (sortOrder === 'highest') {
                return quantityB - quantityA // highest
            } else {
                return quantityA - quantityB // lowest
            }
        }
    })




  return (

    <>
        <div className="bg-[#FFFFFF] p-4 rounded-lg border-2 shadow-lg">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 ml-5">
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                            <Image 
                                src="/searchicon.svg" 
                                alt="Search"
                                width={16} 
                                height={16} 
                                className="opacity-70"
                            />
                        </span>
                        <input 
                            placeholder="Search Materials" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="cursor-auto font-uncut-sans text-[black] text-[12px] w-80 h-10 pl-10 pr-4 py-3 border-gray-300 border-2 rounded-lg focus:outline-none focus:border-gray-300"
                        />
                    </div>
                    
                    <button 
                        onClick={handleDateSortToggle}
                        className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors ${sortBy === 'date' ? 'border-2 border-yellow-400' : ''}`}
                        title={sortBy === 'date' ? (sortOrder === 'newest' ? 'Sort by oldest' : 'Sort by newest') : 'Sort by date'}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round"/>
                            <line x1="3" y1="12" x2="15" y2="12" strokeLinecap="round"/>
                            <line x1="3" y1="18" x2="9" y2="18" strokeLinecap="round"/>
                        </svg>
                    </button>
                    
                    <button 
                        onClick={handleQuantitySortToggle}
                        className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors ${sortBy === 'quantity' ? 'border-2 border-yellow-400' : ''}`}
                        title={sortBy === 'quantity' ? (sortOrder === 'highest' ? 'Sort by lowest quantity' : 'Sort by highest quantity') : 'Sort by quantity'}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                
                <button onClick={handleAddNew} className="bg-[#444EAA] cursor-pointer text-white px-8 py-3 mr-5 h-10 rounded-[5px] text-[12px] border-blue hover:bg-blue-600 font-uncut-sans">
                    +&nbsp; Add New
                </button>
            </div>

            <div>
                {formOpen && (
                    <MaterialForm onSubmit={handleItemsAdded} onClose={() => setFormOpen(false)} />
                )}
                    
            </div>
            <div className="ml-1 mr-1">
                {loading ? (
                    <div className="text-center py-8">Loading materials...</div>
                ) : (
                    <BlankItem items={sortedMaterials} onChangeQuantity={handleChangeQuantity}/>
                )}
            </div>

        </div>
    </>


  );
}
