'use client'
import Image from "next/image";
import { useState } from "react";
import MaterialForm from "./MaterialForm";
import BlankItem from "../blankitem/page";
import { useMaterials, MaterialItem } from "../../hooks/useMaterials";
import { useAuth } from "../../hooks/useAuth";

export default function MatComponent() {
    const { user } = useAuth()
    const { materials, loading, addMaterial, updateMaterial } = useMaterials(user?.uid || null)
    const [formOpen, setFormOpen] = useState(false);

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
        const item = materials[index]
        if (!item?.id) return
        
        const nextQty = Math.max(0, Number(item.quantity || 0) + delta)
        try {
            await updateMaterial(item.id, { quantity: String(nextQty) })
        } catch (error) {
            console.error('Failed to update quantity:', error)
        }
    }


  return (

    <>
        <div className="bg-[#FFFFFF] p-4 rounded-lg border-2 shadow-lg">
            <div className="flex items-center justify-between mb-3">
                {/* Search input on the left */}
                <div className="relative ml-5">
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
                        className="cursor-auto font-uncut-sans text-[black] text-[12px] w-80 h-10 pl-10 pr-4 py-3 border-gray-300 border-2 rounded-lg focus:outline-none focus:border-gray-300"
                    />
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
                    <BlankItem items={materials} onChangeQuantity={handleChangeQuantity}/>
                )}
            </div>

        </div>
    </>


  );
}
