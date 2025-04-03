import Link from 'next/link'
import { frameworks } from '@/lib/data'

export default function Dashboard() {
  // 統計數據可以從 API 或檔案系統獲取
  const statsData = {
    promptsCount: "125",
    frameworksCount: frameworks.length.toString(),
    rulesCount: "42"
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">提示詞管理系統</h1>
      <p className="text-gray-600 mt-2">框架特定提示詞倉儲和規則管理</p>
      
      <section className="mt-8" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="text-xl font-semibold mb-4">統計概覽</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard 
            title="提示詞總數" 
            value={statsData.promptsCount}
          />
          <DashboardCard 
            title="框架支援" 
            value={statsData.frameworksCount}
          />
          <DashboardCard 
            title="規則數量" 
            value={statsData.rulesCount}
          />
        </div>
      </section>
      
      <section className="mt-10" aria-labelledby="frameworks-heading">
        <h2 id="frameworks-heading" className="text-xl font-semibold mb-4">支援框架</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {frameworks.map(framework => (
            <FrameworkCard 
              key={framework.id}
              name={framework.name}
              version={framework.version}
              rules={framework.rulesCount}
              href={`/frameworks/${framework.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 cursor-default">
      <h3 className="text-gray-500 font-medium">{title}</h3>
      <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{value}</p>
    </div>
  )
}

function FrameworkCard({ name, version, rules, href }: { name: string; version: string; rules: number; href: string }) {
  return (
    <Link href={href}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
        <div className="flex justify-between items-center mt-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">v{version}</span>
          <span className="text-gray-600 font-medium">{rules} 條規則</span>
        </div>
      </div>
    </Link>
  )
}