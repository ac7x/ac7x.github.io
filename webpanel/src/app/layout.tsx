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
    <html lang="zh-TW">
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen font-sans text-gray-900 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Header />
            <main className="p-8 min-h-[calc(100vh-4rem)] animate-fade-in">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}