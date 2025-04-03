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
      <body className="bg-slate-50 min-h-screen font-sans text-gray-900 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 overflow-hidden">
            <Header />
            <main className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}