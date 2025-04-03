import { frameworks } from '@/lib/data'

export default function Dashboard() {
  const statsData = {
    promptsCount: "125",
    frameworksCount: frameworks.length.toString(),
    rulesCount: "42"
  }

  return (
    <div className="space-y-8 animate-fade">
      {/* 頂部橫幅區 */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 -mx-8 -mt-8 px-8 py-10 text-white rounded-b-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">提示詞管理系統</h1>
          <p className="text-blue-100 mt-4 text-lg max-w-2xl">框架特定提示詞倉儲和規則管理，為開發者提供統一的框架規則參考</p>
        </div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* 改為並排布局容器 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 統計概覽區塊 */}
        <section className="container-base lg:col-span-1">
          <h2 id="stats-heading" className="text-xl font-bold mb-4 text-gray-900 flex items-center">
            <span className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-3">📊</span>
            統計概覽
          </h2>
          <div className="grid gap-4">
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
        
        {/* 支援框架區塊 */}
        <section className="container-base lg:col-span-2">
          <h2 id="frameworks-heading" className="text-xl font-bold mb-4 text-gray-900 flex items-center">
            <span className="bg-indigo-100 text-indigo-700 p-2 rounded-lg mr-3">🧩</span>
            熱門框架
            <a href="/frameworks" className="ml-auto text-sm text-blue-600 hover:text-blue-700">查看全部 →</a>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {frameworks.slice(0, 4).map(framework => (
              <FrameworkInfoCard 
                key={framework.id}
                name={framework.name}
                version={framework.version}
                rules={framework.rulesCount}
                description={framework.description}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 資源區塊 - 更緊湊的設計 */}
      <section aria-labelledby="resources-heading" className="mt-8 bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border border-blue-100">
        <h2 id="resources-heading" className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
          <span className="bg-green-100 text-green-700 p-2 rounded-lg mr-3">📚</span>
          相關資源
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResourceCard 
            title="開始使用"
            description="了解如何在專案中使用框架規則和提示詞"
            icon="🚀"
          />
          <ResourceCard 
            title="規則匯整"
            description="查看所有可用的規則與最佳實踐"
            icon="📋"
          />
        </div>
      </section>
    </div>
  )
}

// 統計卡片元件 - 更緊湊的設計
function DashboardCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="card-base p-4 hover-scale">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 text-xs font-medium rounded-full">
          即時
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {value}
      </p>
    </div>
  )
}

// 框架信息卡片 - 更緊湊的設計
function FrameworkInfoCard({ name, version, rules, description }: { 
  name: string; 
  version: string; 
  rules: number;
  description: string;
}) {
  return (
    <div className="card-base p-4 hover-scale">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
          v{version}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
      <div className="flex items-center text-sm text-gray-400">
        <span className="text-base mr-1">⚙️</span>
        <span className="font-medium text-gray-600">{rules}</span>
        <span className="ml-1">規則</span>
      </div>
    </div>
  )
}

// 資源卡片元件
function ResourceCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="glass p-6 rounded-xl border border-blue-100 hover-scale">
      <div className="flex items-start">
        <span className="text-3xl mr-4 bg-blue-50 p-2 rounded-lg">{icon}</span>
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}