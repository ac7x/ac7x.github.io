import Link from 'next/link'
import { frameworks } from '@/lib/data'

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">提示詞管理系統</h1>
      <p className="text-gray-600 mt-2">框架特定提示詞倉儲和規則管理</p>
      
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">統計概覽</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard 
            title="提示詞總數" 
            value="125" 
            href="/prompts/browse" 
          />
          <DashboardCard 
            title="框架支援" 
            value={`${frameworks.length}`}  
            href="/frameworks" 
          />
          <DashboardCard 
            title="規則數量" 
            value="42" 
            href="/rules" 
          />
        </div>
      </section>
      
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">支援框架</h2>
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

function DashboardCard({ title, value, href }: { title: string; value: string; href: string }) {
  return (
    <Link href={href}>
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <h3 className="text-gray-500">{title}</h3>
        <p className="text-3xl font-semibold mt-2">{value}</p>
      </div>
    </Link>
  )
}

function FrameworkCard({ name, version, rules, href }: { name: string; version: string; rules: number; href: string }) {
  return (
    <Link href={href}>
      <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-all border border-gray-100">
        <h3 className="font-medium text-lg">{name}</h3>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>v{version}</span>
          <span>{rules} 條規則</span>
        </div>
      </div>
    </Link>
  )
}