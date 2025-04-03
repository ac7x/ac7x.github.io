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
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen p-4 shadow-xl fixed">
      <div className="mb-8 pt-3">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          提示詞管理系統
        </h1>
      </div>
      <nav className="space-y-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || 
                           (item.path !== '/' && pathname?.startsWith(item.path))
            return (
              <li key={item.path} className="transition-all duration-200">
                <Link href={item.path}>
                  <div className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg' 
                      : 'hover:bg-white/10 hover:translate-x-1'
                  }`}>
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}