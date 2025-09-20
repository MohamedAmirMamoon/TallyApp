'use client'
import SearchComponent from './SearchComponent'
import { useState } from 'react';
import OrderQueue from './OrderQueue';


export default function MatComponent() {


  const [activeTab, setActiveTab] = useState<'inventory' | 'orderQueue'>('inventory')


  return (
    <div className="min-h-screen bg-gray-50 px-30 py-12">
      <div className="max-w-[1800px] mx-auto">

        <div className='flex justify-between'>
          <div className="flex items-center mb-4 mt-4">
            <h1 className="text-xl font-uncut-sans text-[#1A1A1A]">Materials </h1>
            <h1 className="text-xl font-uncut-sans text-[#AAAAAA]">&nbsp;/ Blanks</h1>
          </div>

          <div className='mb-4 mt-4 bg-[#E6E6E6] rounded-lg p-1'>
            <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-2 rounded-sm hover:cursor-pointer font-uncut-sans transition-colors duration-200 ${
                  activeTab === 'inventory'
                    ? 'text-[#333333] bg-[#FFFFFF] border-[#D4D4D4] border-1'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
            >
              Inventory
            </button>
            <button
              onClick={() => setActiveTab('orderQueue')}
              className={`px-4 py-2 rounded-sm hover:cursor-pointer font-uncut-sans transition-colors duration-200 ${
                activeTab === 'orderQueue'
                  ? 'text-[#333333] bg-[#FFFFFF] border-[#D4D4D4] border-1'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Order Queue
            </button>
          </div>

        </div> 
        
        {activeTab === 'orderQueue' ? <OrderQueue /> : <SearchComponent />}
      </div>
    </div>
  );
}
