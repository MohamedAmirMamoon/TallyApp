'use client'
import Image from "next/image";
import SearchComponent from '../matcomponent/SearchComponent'

interface MaterialItem {
    name: string;
    image: string;
    imagePreview?: string;
    color: string;
    size: string;
    quantity: string;
    threshold: string;
}


interface BlankitmeProps {
    items: MaterialItem[];
    onChangeQuantity?: (index: number, delta: number) => void;
}

export default function BlankItem({ items, onChangeQuantity }: BlankitmeProps) {
  return (



    <>

            
        <div>
            {items.map((item: MaterialItem, index: number) => (
                    <div key={index} className="flex justify-between items-center font-uncut-sans text-2xl text-black font-uncut-sans border-gray-300 rounded p-4 pb-0 mb-1">
                        <div className="flex items-center space-x-4">
                        {(item.imagePreview || item.image) && (
                            <div className="w-12 h-12 mr-4 rounded-md border border-gray-300 bg-white flex items-center justify-center overflow-hidden">
                                <img 
                                    src={item.image.startsWith('http') ? item.image : `/images/${item.image}`}
                                    alt={item.name} 
                                    className="w-12 h-12 object-contain" 
                                    onLoad={() => console.log('Image loaded successfully:', item.image)}
                                    onError={(e) => {
                                        console.log('Image failed to load:', item.image)
                                        console.log('Image preview:', item.imagePreview)
                                        // fallbackk to a placeholder if image fails to load
                                        e.currentTarget.src = 'https://via.placeholder.com/48x48.png'
                                    }}
                                />
                            </div>
                        )}
                            <div className="flex items-center space-x-2 text-[12px]">
                                <div>{item.name}</div>
                                <span></span>
                                <span>-</span>
                                <div>{item.color}</div>
                                <span>/</span>
                                <div>{item.size}</div>
                            </div>
                        </div>
                        <div className="flex text-center items-stretch border border-gray-300 rounded overflow-hidden">

                            <button aria-label="decrease" onClick={() => onChangeQuantity && onChangeQuantity(index, -1)} className="w-12 text-[#808080] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition">
                                <span className="text-6xl leading-none select-none text-[50px]">−</span>
                            </button>


                            {(() => {
                                const qty = Number(item.quantity)
                                const thr = Number(item.threshold)
                                const isLow = !Number.isNaN(qty) && !Number.isNaN(thr) && qty < thr
                                return (
                                    <div className="flex flex-col text-center justify-center bg-white w-12 min-w-[120px] border-x border-gray-300 h-full">
                                        <div className={`text-[18px] flex-1 py-1 flex items-center justify-center ${isLow ? 'bg-[#FAF2E3] text-[#333333] border-[#C19A4D] border-2' : 'bg-white border-[#D4D4D4] border-2 text-[#333333]'}`}>{item.quantity}</div>
                                        <hr className="w-full border-[#D4D4D4]" />
                                        <div className={`text-[10px] tracking-wide flex-1 flex items-center justify-center ${isLow ? 'bg-[#C19A4D] text-white ' : 'bg-[#F2F2F2] border-[#D4D4D4] text-[#808080]'}`}>{item.threshold} PCS</div>
                                    </div>
                                )
                            })()}

                            <button aria-label="increase" onClick={() => onChangeQuantity && onChangeQuantity(index, 1)} className="text-[#808080] w-12  bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition">
                                <span className="text-6xl leading-none select-none text-[50px]">+</span>
                            </button>
                            
                        </div>
                    </div>
            ))}
        </div>

    </>


  );
}
