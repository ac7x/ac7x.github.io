'use client'

import { useState } from 'react'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 搜尋邏輯
  }
  
  return (
    <header className="bg-white/80 shadow-sm h-16 p-4 sticky top-0 z-10 backdrop-blur-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            框架適配提示詞倉儲
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              placeholder="搜尋規則與提示詞..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-64 bg-gray-50/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </form>
          <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full transition-all duration-300 hover:bg-blue-100 font-medium">
            v{typeof window !== 'undefined' && (window as any).APP_VERSION || '2023.12.1'}
          </button>
        </div>
      </div>
    </header>
  )
}