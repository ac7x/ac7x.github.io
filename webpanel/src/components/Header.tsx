'use client'

import { useState } from 'react'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }
  
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-8 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            框架適配提示詞倉儲
          </h2>
          <form onSubmit={handleSearch} className="relative hidden lg:block">
            <input
              type="search"
              placeholder="搜尋規則與提示詞..."
              className="w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                       focus:bg-white transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </form>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl
                         hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm">
          v{typeof window !== 'undefined' && (window as any).APP_VERSION || '2023.12.1'}
        </button>
      </div>
    </header>
  )
}