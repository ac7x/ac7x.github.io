'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { name: '儀表板', path: '/', icon: '📊' },
  { name: '框架', path: '/frameworks', icon: '🧩' },
  { name: '提示詞', path: '/prompts', icon: '📝' },
  { name: '規則管理', path: '/rules', icon: '⚙️' },
  { name: '文件中心', path: '/docs', icon: '📚' },
]

export default function Sidebar() {
  const pathname = usePathname()
  
  return (
    <div className="w-64 fixed inset-y-0 left-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              提示詞管理系統
            </span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path || 
                            (item.path !== '/' && pathname?.startsWith(item.path))
              return (
                <li key={item.path}>
                  <Link href={item.path}>
                    <div className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg' 
                        : 'hover:bg-white/10 hover:translate-x-1'
                    }`}>
                      <span className="mr-3 text-xl">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-700/50">
          <div className="px-3 py-2 text-sm text-gray-400">
            <p>版本 {typeof window !== 'undefined' && (window as any).APP_VERSION || '2023.12.1'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}