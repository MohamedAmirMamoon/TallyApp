'use client'
import { useState } from 'react'


interface MaterialFormProps {
    onClose: () => void;
    onSubmit: (data: any) => void; // Add this line
}



export default function MaterialForm({ onClose, onSubmit }: MaterialFormProps) {
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [quantity, setQuantity] = useState("")
    const [threshold, setThreshold] = useState("")
    const [productLink, setProductLink] = useState("")

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', { name, image, imageFile, imagePreview, color, size, quantity, threshold })
        
        try {
            const ourFormData = { name, image, imageFile, imagePreview, color, size, quantity, threshold, productLink };
            await onSubmit(ourFormData);
            onClose()
        } catch (error) {
            console.error('Form submission error:', error)
            // Don't close form if there's an error
        }
    }

    

    return (
        <div className="fixed inset-0 z-[9999]">
            <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-opacity-50 w-full h-full" />
            <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl transform transition-transform duration-300 ease-out translate-x-0 overflow-y-auto p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-black font-uncut-sans">Add New Material</h1>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                            name="name" 
                            type="text"
                            value={name}
                            className="border border-gray-300 rounded px-3 py-2 w-full text-gray-900 font-uncut-sans"
                            placeholder="Enter material name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault()
                                const file = e.dataTransfer.files && e.dataTransfer.files[0]
                                if (file) {
                                    setImageFile(file)
                                    setImagePreview(URL.createObjectURL(file))
                                    setImage(file.name)
                                }
                            }}
                            className="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center space-x-4 hover:border-gray-400 cursor-pointer"
                            onClick={() => document.getElementById('imageInput')?.click()}
                        >
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files && e.target.files[0]
                                    if (file) {
                                        setImageFile(file)
                                        setImagePreview(URL.createObjectURL(file))
                                        setImage(file.name)
                                    }
                                }}
                            />
                            {imagePreview ? (
                                <div className="flex items-center space-x-4 w-full">
                                    <div className="w-16 h-16 rounded-md border border-gray-300 bg-white flex items-center justify-center overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imagePreview} alt={name || 'preview'} className="w-12 h-12 object-contain" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm text-gray-900 truncate">{image}</div>
                                        <div className="text-xs text-gray-500">Drag a new image to replace</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-sm text-gray-600">Drag and drop an image here, or click to upload</div>
                                    <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Browse</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                        <input 
                            name="color" 
                            type="text"
                            value={color}
                            className="border border-gray-300 rounded px-3 py-2 w-full text-gray-900 font-uncut-sans"
                            placeholder="Enter color)"
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                        <input 
                            name="size" 
                            type="text"
                            value={size}
                            className="border border-gray-300 rounded px-3 py-2 w-full text-gray-900 font-uncut-sans"
                            placeholder="Enter size (e.g., 10x10cm)"
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input 
                            name="quantity" 
                            type="number"
                            value={quantity}
                            className="border border-gray-300 rounded px-3 py-2 w-full text-gray-900 font-uncut-sans"
                            placeholder="Enter quantity"
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Threshold</label>
                        <input 
                            name="threshold" 
                            type="number"
                            value={threshold}
                            className="border border-gray-300 rounded px-3 py-2 w-full text-gray-900 font-uncut-sans"
                            placeholder="Enter threshold"
                            onChange={(e) => setThreshold(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Link (Optional)</label>
                        <input 
                            name="productLink" 
                            type="url"
                            value={productLink}
                            className="border border-gray-300 rounded px-3 py-2 w-full text-gray-900 font-uncut-sans"
                            placeholder="https://example.com/product"
                            onChange={(e) => setProductLink(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                        <button 
                            type="submit"
                            className="bg-[#444EAA] text-white px-6 py-2 rounded font-uncut-sans hover:bg-blue-600 flex-1"
                        >
                            Add
                        </button>
                        <button 
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-6 py-2 rounded font-uncut-sans hover:bg-gray-600 flex-1"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}