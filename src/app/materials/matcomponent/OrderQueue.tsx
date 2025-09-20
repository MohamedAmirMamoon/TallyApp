'use client'
import { useMaterials, MaterialItem } from '../../hooks/useMaterials'
import { useAuth } from '../../hooks/useAuth'

export default function OrderQueue() {
    const { user } = useAuth()
    const { materials, loading } = useMaterials(user?.uid || null)

    // Filter materials that are below threshold
    const lowStockItems = materials.filter(item => {
        const quantity = Number(item.quantity) || 0
        const threshold = Number(item.threshold) || 0
        return quantity < threshold
    })

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="text-lg font-uncut-sans text-gray-600">Loading order queue...</div>
            </div>
        )
    }

    if (lowStockItems.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-2xl font-uncut-sans text-gray-600 mb-4">All Good! 🎉</div>
                <div className="text-gray-500 font-uncut-sans">No items need reordering</div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-uncut-sans text-[#444EAA] font-bold mb-2">Low Stock Alert</h2>
                <p className="text-gray-600 font-uncut-sans">{lowStockItems.length} items need reordering</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lowStockItems.map((item: MaterialItem, index: number) => {
                    const quantity = Number(item.quantity) || 0
                    const threshold = Number(item.threshold) || 0
                    const needed = threshold - quantity

                    return (
                        <div key={item.id || index} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            {/* Image */}
                            <div className="w-full h-32 mb-4 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                                {(item.imagePreview || item.image) ? (
                                    <img 
                                        src={item.imagePreview || item.image || '/placeholder-image.svg'} 
                                        alt={item.name} 
                                        className="w-full h-full object-contain" 
                                        onError={(e) => {
                                            e.currentTarget.src = '/placeholder-image.svg'
                                        }}
                                    />
                                ) : (
                                    <div className="text-gray-400 text-sm">No Image</div>
                                )}
                            </div>

                            {/* Item Details */}
                            <div className="text-center">
                                <h3 className="text-lg font-uncut-sans font-semibold text-gray-900 mb-2">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {item.color} / {item.size}
                                </p>

                                {/* Stock Info */}
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                    <div className="text-sm text-red-600 font-uncut-sans mb-1">
                                        Current: {quantity} / {threshold}
                                    </div>
                                    <div className="text-lg font-bold text-red-700 font-uncut-sans">
                                        Need to buy: {needed}
                                    </div>
                                </div>

                                {/* Buy Button */}
                                {item.productLink ? (
                                    <a
                                        href={item.productLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-[#444EAA] text-white px-4 py-2 rounded-lg font-uncut-sans hover:bg-blue-600 transition-colors inline-block text-center"
                                    >
                                        Buy Now
                                    </a>
                                ) : (
                                    <div className="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-lg font-uncut-sans text-center cursor-not-allowed">
                                        No Link Available
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
