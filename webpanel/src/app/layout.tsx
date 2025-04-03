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
          {/* 背景裝飾元素 */}
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] opacity-50"></div>
          </div>
          
          {/* 側邊欄 - 在小螢幕上隱藏 */}
          <div className="hidden md:block">
            <Sidebar />
          </div>
          
          {/* 主內容區域 */}
          <div className="flex-1 w-full md:ml-64 transition-all duration-300">
            <Header />
            <main className="p-4 md:p-8 min-h-[calc(100vh-4rem)] animate-fade-in">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
            
            {/* 新增頁尾 */}
            <footer className="bg-gray-800 text-gray-300 p-8 mt-16">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-white text-lg mb-4">提示詞管理系統</h3>
                    <p className="text-sm text-gray-400">框架特定提示詞倉儲和規則管理工具，提供一致的開發體驗。</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-4">實用連結</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="hover:text-blue-300 transition-colors">使用文檔</a></li>
                      <li><a href="#" className="hover:text-blue-300 transition-colors">框架規則</a></li>
                      <li><a href="#" className="hover:text-blue-300 transition-colors">關於專案</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-4">版本資訊</h4>
                    <div className="text-sm text-gray-400">
                      <p>v{typeof window !== 'undefined' && (window as any).APP_VERSION || '2023.12.1'}</p>
                      <p className="mt-2">© {new Date().getFullYear()} 框架適配倉儲規則中心</p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}