import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export const metadata = {
  title: '提示詞管理系統',
  description: '框架特定提示詞倉儲和規則管理',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen font-sans text-gray-900 antialiased">
        <div className="flex min-h-screen relative">
          {/* 優化背景裝飾元素 */}
          <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-[130px] opacity-60 animate-float"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-100/30 to-purple-100/30 rounded-full blur-[130px] opacity-60 animate-float-delayed"></div>
          </div>
          
          {/* 側邊欄 - 在小螢幕上隱藏 */}
          <div className="hidden md:block">
            <Sidebar />
          </div>
          
          {/* 主內容區域 */}
          <div className="flex-1 w-full md:ml-64 transition-all duration-500 ease-in-out">
            <Header />
            <main className="p-4 md:p-6 min-h-[calc(100vh-4rem)] animate-fade-in [animation-duration:0.7s]">
              <div className="max-w-5xl mx-auto">
                {children}
              </div>
            </main>
            
            {/* 優化頁尾設計 */}
            <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300 p-8 mt-8">
              <div className="max-w-5xl mx-auto text-center space-y-4">
                <p className="text-sm">© {new Date().getFullYear()} 框架適配倉儲規則中心</p>
                <div className="text-xs text-gray-400">共同打造更好的開發體驗</div>
              </div>
            </footer>
          </div>

          {/* 優化回到頂部按鈕 */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg
                     hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 opacity-0 translate-y-8
                     scroll-show group"
            aria-label="回到頂部"
          >
            <span className="block transform group-hover:-translate-y-1 transition-transform">↑</span>
          </button>
        </div>
      </body>
    </html>
  )
}