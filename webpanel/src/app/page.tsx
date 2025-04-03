import Link from 'next/link'
import { frameworks } from '@/lib/data'

export default function Dashboard() {
  const statsData = {
    promptsCount: "125",
    frameworksCount: frameworks.length.toString(),
    rulesCount: "42"
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 -mx-8 -mt-8 px-8 py-12 text-white rounded-b-3xl shadow-lg">
        <h1 className="text-4xl font-bold">提示詞管理系統</h1>
        <p className="text-blue-100 mt-4 text-lg">框架特定提示詞倉儲和規則管理</p>
      </div>
      
      <section aria-labelledby="stats-heading" className="mt-8">
        <h2 id="stats-heading" className="text-2xl font-bold mb-6 text-gray-900">統計概覽</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard 
            title="提示詞總數" 
            value={statsData.promptsCount}
            icon="📝"
          />
          <DashboardCard 
            title="框架支援" 
            value={statsData.frameworksCount}
            icon="🧩"
          />
          <DashboardCard 
            title="規則數量" 
            value={statsData.rulesCount}
            icon="⚙️"
          />
        </div>
      </section>
      
      <section aria-labelledby="frameworks-heading" className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 id="frameworks-heading" className="text-2xl font-bold text-gray-900">支援框架</h2>
          <Link href="/frameworks" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            查看全部 
            <span className="ml-1">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

function DashboardCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-gray-600 font-medium mb-1">{title}</h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
      </div>
    </div>
  )
}

function FrameworkCard({ name, version, rules, href }: { name: string; version: string; rules: number; href: string }) {
  return (
    <Link href={href}>
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium group-hover:bg-blue-100 transition-colors">
            v{version}
          </span>
          <div className="flex items-center text-gray-600">
            <span className="font-medium">{rules}</span>
            <span className="ml-1 text-sm">規則</span>
          </div>
        </div>
      </div>
    </Link>
  )
}