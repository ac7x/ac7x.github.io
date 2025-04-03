'use client'

import { useState } from 'react'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 搜尋邏輯
  }
  
  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <h2 className="text-lg font-bold text-gray-800">框架適配提示詞倉儲</h2>
        </div>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="搜尋規則與提示詞..."
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all w-64 bg-gray-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium">
            版本: {typeof window !== 'undefined' && (window as any).APP_VERSION || '2023.12.1'}
          </button>
        </div>
      </div>
    </header>
  )
}