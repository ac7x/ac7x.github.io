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
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">提示詞管理系統</h1>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => {
            const isActive = pathname === item.path || 
                             (item.path !== '/' && pathname?.startsWith(item.path))
                             
            return (
              <li key={item.path} className="mb-2">
                <Link href={item.path}>
                  <div className={`flex items-center p-3 rounded-md ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}>
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
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