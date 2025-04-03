'use client'

import { useState } from 'react'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 搜尋邏輯
  }
  
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">框架適配提示詞倉儲</h2>
        </div>
        <div className="flex items-center">
          <form onSubmit={handleSearch} className="mr-4">
            <input
              type="search"
              placeholder="搜尋規則與提示詞..."
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            版本: {typeof window !== 'undefined' && (window as any).APP_VERSION || '2023.12.1'}
          </button>
        </div>
      </div>
    </header>
  )
}