import { frameworks } from '@/lib/data'

export default function Dashboard() {
  const statsData = {
    promptsCount: "125",
    frameworksCount: frameworks.length.toString(),
    rulesCount: "42"
  }

  return (
    <div className="space-y-10 animate-fade-in">
      {/* 頂部橫幅區 - 更現代的漸變效果和深度感 */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 -mx-8 -mt-8 px-8 py-14 text-white rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">提示詞管理系統</h1>
          <p className="text-blue-100 mt-4 text-lg max-w-2xl">框架特定提示詞倉儲和規則管理，為開發者提供統一的框架規則參考</p>
        </div>
        
        {/* 裝飾元素 */}
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* 統計概覽區塊 - 保持不可點擊設計 */}
      <section aria-labelledby="stats-heading" className="mt-10">
        <h2 id="stats-heading" className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
          <span className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-3">📊</span>
          統計概覽
        </h2>
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
      
      {/* 支援框架區塊 - 改為不可點擊的展示卡片 */}
      <section aria-labelledby="frameworks-heading" className="mt-12">
        <h2 id="frameworks-heading" className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
          <span className="bg-indigo-100 text-indigo-700 p-2 rounded-lg mr-3">🧩</span>
          支援框架
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {frameworks.map(framework => (
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
      
      {/* 新增：資源區塊 */}
      <section aria-labelledby="resources-heading" className="mt-12 bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-blue-100">
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

// 統計卡片元件 - 不可點擊
function DashboardCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 cursor-default">
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        <span className="bg-gray-100 text-gray-500 px-3 py-1 text-xs font-medium rounded-full">
          即時數據
        </span>
      </div>
      <h3 className="text-gray-600 font-medium mb-1">{title}</h3>
      <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {value}
      </p>
    </div>
  )
}

// 框架信息卡片 - 不可點擊
function FrameworkInfoCard({ name, version, rules, description }: { 
  name: string; 
  version: string; 
  rules: number;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-default transition-all duration-300 flex flex-col h-full">
      {/* 框架標題與版本 */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
          v{version}
        </span>
      </div>
      
      {/* 框架描述 */}
      <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-2">{description}</p>
      
      {/* 底部信息 */}
      <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-lg mr-2">⚙️</span>
          <span className="font-medium text-gray-700">{rules}</span>
          <span className="ml-1 text-xs text-gray-500">規則</span>
        </div>
        <span className="text-xs text-gray-400 uppercase tracking-wider">資料已更新</span>
      </div>
    </div>
  )
}

// 資源卡片元件
function ResourceCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-blue-100 cursor-pointer hover:shadow-md transition-all duration-300">
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