'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useAuth } from "../hooks/useAuth";
import { useRouter, usePathname } from 'next/navigation'


interface SidebarProps {
  user?: {
    email: string
    name?: string
    photoURL?: string
  } | null
}

export default function Sidebar({ user }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
      try {
        const saved = localStorage.getItem('tally_sidebar_collapsed')
        if (saved !== null) {
          setCollapsed(saved === '1')
        }
      } catch {}
    }, [])

    const toggleCollapsed = () => {
      setCollapsed(prev => {
        const next = !prev
        try { localStorage.setItem('tally_sidebar_collapsed', next ? '1' : '0') } catch {}
        return next
      })
    }

    const { loading, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const isActive = (key: string) => pathname === `/${key}`
    const iconSrc = (key: string) => isActive(key)
      ? `/active-icons/active-${key}.svg`
      : `/inactive-icons/inactive-${key}.svg`


  return (

    <div className={`${collapsed ? 'w-1/25 min-w-17' : 'w-1/5 min-w-40'} bg-[#FFFFFF] border-r-1   h-screen flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'px-2' : 'p-4'}`}>

        {/* Top parts */}
        <div className={`flex items-center mt-5 ${collapsed ? 'justify-center' : 'space-x-3'} p-3 mb-6 select-none`}>
            <Image 
                src="/tallylogo.svg" 
                alt="title" 
                width={30} 
                height={30} 
                className="flex-shrink-0"
            />
            {!collapsed && <h1 className="text-2xl font-uncut-sans text-[#444EAA] font-bold">Tally</h1>}
        </div>
        
    
      <div className="flex-1">
        <ul className="flex flex-col space-y-2">
          <li>
            <button onClick={() => router.push('/materials')} className={`group font-uncut-sans rounded-[8px] w-full flex items-center ${collapsed ? 'justify-center p-2' : 'space-x-3 p-3 text-left'} ${!collapsed && 'hover:bg-gray-200'} ${!collapsed && isActive('materials') ? 'bg-[#EEF0FF] text-[#262626] ring-1 ring-[#C7CCF7]' : 'text-[#808080]'}`}>
              {collapsed ? (
                <div className={`w-8 h-8 cursor-pointer rounded-md flex items-center justify-center ${isActive('materials') ? 'bg-[#EEF0FF] ring-1 ring-[#C7CCF7]' : ''} group-hover:bg-gray-200`}>
                  <Image src={iconSrc('materials')} alt="Materials" width={20} height={20} />
                </div>
              ) : (
                <>
                  <Image src={iconSrc('materials')} alt="Materials" width={20} height={20} className="flex-shrink-0" />
                  <span className='text-xs'>Materials</span>
                </>
              )}
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/products')} className={`group cursor-pointer font-uncut-sans rounded-[8px] w-full flex items-center ${collapsed ? 'justify-center p-2' : 'space-x-3 p-3 text-left'} ${!collapsed && 'hover:bg-gray-200'} ${!collapsed && isActive('products') ? 'bg-[#EEF0FF] text-[#262626] ring-1 ring-[#C7CCF7]' : 'text-[#808080]'}`}>
              {collapsed ? (
                <div className={`w-8 h-8 cursor-pointer rounded-md flex items-center justify-center ${isActive('products') ? 'bg-[#EEF0FF] ring-1 ring-[#C7CCF7]' : ''} group-hover:bg-gray-200`}>
                  <Image src={iconSrc('products')} alt="Products" width={20} height={20}  />
                </div>
              ) : (
                <>
                  <Image src={iconSrc('products')} alt="Products" width={20} height={20}  className="flex-shrink-0" />
                  <span className='text-xs'>Products</span>
                </>
              )}
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/fulfillments')} className={`group cursor-pointer font-uncut-sans rounded-[8px] w-full flex items-center ${collapsed ? 'justify-center p-2' : 'space-x-3 p-3 text-left'} ${!collapsed && 'hover:bg-gray-200'} ${!collapsed && isActive('fulfillments') ? 'bg-[#EEF0FF] text-[#262626] ring-1 ring-[#C7CCF7]' : 'text-[#808080]'}`}>
              {collapsed ? (
                <div className={`w-8 h-8 cursor-pointer rounded-md flex items-center justify-center ${isActive('fulfillments') ? 'bg-[#EEF0FF] ring-1 ring-[#C7CCF7]' : ''} group-hover:bg-gray-200`}>
                  <Image src={iconSrc('fulfillments')} alt="Fulfillments" width={20} height={20}  />
                </div>
              ) : (
                <>
                  <Image src={iconSrc('fulfillments')} alt="Fulfillments" width={20} height={20}  className="flex-shrink-0" />
                  <span className="transition-all duration-300 ease-in-out text-xs">Fulfillments</span>
                </>
              )}
            </button>
          </li>
          <hr className='border-[#EBEBEB] border-t-2'></hr>
          <li>
            <button onClick={() => router.push('/integrations')} className={`group cursor-pointer font-uncut-sans rounded-[8px] w-full flex items-center ${collapsed ? 'justify-center p-2' : 'space-x-3 p-3 text-left'} ${!collapsed && 'hover:bg-gray-200'} ${!collapsed && isActive('integrations') ? 'bg-[#EEF0FF] text-[#262626] ring-1 ring-[#C7CCF7]' : 'text-[#808080]'}`}>
              {collapsed ? (
                <div className={`w-8 h-8 cursor-pointer rounded-md flex items-center justify-center ${isActive('integrations') ? 'bg-[#EEF0FF] ring-1 ring-[#C7CCF7]' : ''} group-hover:bg-gray-200`}>
                  <Image src={iconSrc('integrations')} alt="Integrations" width={20} height={20}  />
                </div>
              ) : (
                <>
                  <Image src={iconSrc('integrations')} alt="Integrations" width={20} height={20} className="flex-shrink-0" />
                  <span className='text-xs'>Integrations</span>
                </>
              )}
            </button>
          </li>
        </ul>
      </div>
      {/* Middle parrt*/}
        <div className="flex-5 flex items-center justify-center">
            <button 
                onClick={toggleCollapsed} 
                className={`font-uncut-sans text-[#808080] cursor-pointer rounded-[8px] w-full flex items-center transition-all duration-300 hover:bg-gray-200 ${
                collapsed ? 'justify-center p-2' : 'justify-start space-x-3 p-3'
                }`}
            >
                <div className={`w-8 h-8 flex items-center justify-center transition-transform duration-300 ${
                collapsed ? 'rotate-0' : 'rotate-180'
                }`}>
                <div className={`w-0 h-0 transition-all duration-300 ${
                    collapsed 
                    ? 'border-l-[8px] border-l-[#404040] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent' 
                    : 'border-l-[8px] border-l-[#404040] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent'
                }`} />
                </div>
                
                <span className={`transition-all duration-300 text-xs ${
                collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                }`}>
                Collapse
                </span>
            </button>
        </div>

      {/* Bottom part */}
      <div className="mt-auto mb-2">
        <ul className="flex flex-col space-y-2">
          <li>
            <button onClick={logout} className={`font-uncut-sans text-[#808080] cursor-pointer rounded-[8px] w-full flex items-center ${collapsed ? 'justify-center p-2' : 'space-x-3 p-3 text-left'} ${!collapsed && 'hover:bg-gray-200'}`}>
              {collapsed ? (
                <div className="w-10 h-10 cursor-pointer rounded-md flex items-center justify-center group-hover:bg-gray-200">
                  <Image 
                    src="/logout.svg" 
                    alt="Logout" 
                    width={30} 
                    height={30} 
                  />
                </div>
              ) : (
                <>
                  <Image 
                    src="/logout.svg" 
                    alt="Logout" 
                    width={30} 
                    height={30} 
                    className="flex-shrink-0"
                  />
                  <span className='text-xs'>Logout</span>
                </>
              )}
            </button>
          </li>
          <li>
              <button className={`font-uncut-sans text-[#808080] rounded-[8px] cursor-pointer w-full flex items-center ${collapsed ? 'justify-center p-2' : 'space-x-3 p-3 text-left'} ${!collapsed && 'hover:bg-gray-200'}`}>
                {collapsed ? (
                  <div className="w-10 h-10 cursor-pointer rounded-md flex items-center justify-center group-hover:bg-gray-200">
                    <Image 
                        src={"/mo.svg"} 
                        alt="Profile" 
                        width={30} 
                        height={30}
                        className="rounded-full"
                      />
                  </div>
                ) : (
                  <>
                    <Image 
                        src={"/mo.svg"} 
                        alt="Profile" 
                        width={30} 
                        height={30}
                        className="rounded-full"
                      />
                    <div className='flex flex-col '>
                        <span className='text-m font-uncut-sans font-bold text-black'>Don't Ruin It</span>
                        <span className='text-xs text-gray-500'>Pro Crafter</span>
                    </div>
                  </>
                )}
              </button>
          </li>
          
        </ul>
      </div>
    </div>
  )
}