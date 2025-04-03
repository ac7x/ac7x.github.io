'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }
  
  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between">
        {/* 左側區域：選單按鈕（行動裝置）和標題 */}
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* 漢堡選單按鈕 - 優化視覺效果 */}
          <button 
            className="p-2 md:hidden rounded-lg hover:bg-gray-100/80 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="開啟選單"
          >
            <span className="block w-5 h-0.5 bg-gray-600 mb-1.5 transition-transform"></span>
            <span className="block w-5 h-0.5 bg-gray-600 mb-1.5"></span>
            <span className="block w-5 h-0.5 bg-gray-600"></span>
          </button>

          {/* 標題 - 增加漸變效果 */}
          <Link href="/">
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              框架適配提示詞倉儲
            </h2>
          </Link>
        </div>
        
        {/* 中間區域：搜尋框 */}
        <form onSubmit={handleSearch} className="relative hidden lg:block flex-grow max-w-lg mx-4">
          <div className="relative">
            <input
              type="search"
              placeholder="搜尋規則與提示詞..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200/50 rounded-full 
                        focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none
                        focus:bg-white/90 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </form>
        
        {/* 右側區域：版本資訊和用戶選項 */}
        <div className="flex items-center space-x-4">
          {/* 版本號 */}
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full
                           hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-sm text-sm">
            v{typeof window !== 'undefined' && (window as any).APP_VERSION || '2023.12.1'}
          </button>
          
          {/* 用戶頭像（範例） */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 hidden md:flex items-center justify-center text-white text-xs font-bold">
            AC
          </div>
        </div>
      </div>

      {/* 行動版選單覆蓋層 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl animate-slide-in">
            <div className="p-4 border-b">
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100" aria-label="關閉選單">
                ✕
              </button>
            </div>
            <div className="p-4">
              <div className="mb-6 relative">
                <input
                  type="search"
                  placeholder="搜尋..."
                  className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute left-2 top-2.5 text-gray-400 text-sm">🔍</span>
              </div>
              
              {/* 在行動版顯示 Sidebar 內容 */}
              <nav>
                <ul className="space-y-2">
                  <li><Link href="/" className="block p-2 hover:bg-gray-100 rounded-lg">儀表板</Link></li>
                  <li><Link href="/frameworks" className="block p-2 hover:bg-gray-100 rounded-lg">框架</Link></li>
                  <li><Link href="/prompts" className="block p-2 hover:bg-gray-100 rounded-lg">提示詞</Link></li>
                  <li><Link href="/rules" className="block p-2 hover:bg-gray-100 rounded-lg">規則管理</Link></li>
                  <li><Link href="/docs" className="block p-2 hover:bg-gray-100 rounded-lg">文件中心</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}