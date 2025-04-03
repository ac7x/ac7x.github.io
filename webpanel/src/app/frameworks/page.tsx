import { frameworks } from '@/lib/data'

export default function FrameworksPage() {
  return (
    <div className="animate-fade">
      {/* 頁面標題區域 */}
      <div className="mb-10 border-b border-gray-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">支援框架</h1>
            <p className="text-gray-600 max-w-2xl">
              展示所有支援的程式語言和框架，包括規則數量與相容性資訊
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors">
              <span className="mr-2">🔍</span> 篩選
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors">
              <span className="mr-2">↓</span> 排序
            </button>
          </div>
        </div>
      </div>
      
      {/* 框架卡片網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map(framework => (
          <FrameworkDetailCard 
            key={framework.id}
            name={framework.name}
            version={framework.version}
            rulesCount={framework.rulesCount}
            description={framework.description}
          />
        ))}
      </div>
      
      {/* 技術圖表區域 */}
      <div className="mt-16 card-base p-8">
        <h2 className="text-2xl font-bold mb-6">框架相容性概覽</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-3 text-left rounded-tl-lg">框架</th>
                <th className="p-3 text-left">最低版本</th>
                <th className="p-3 text-left">規則數量</th>
                <th className="p-3 text-left rounded-tr-lg">狀態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {frameworks.map(framework => (
                <tr key={framework.id} className="hover:bg-gray-50">
                  <td className="p-3 font-medium">{framework.name}</td>
                  <td className="p-3">v{framework.version}</td>
                  <td className="p-3">{framework.rulesCount}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      支援中
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// 純展示用的框架卡片，不可點擊
function FrameworkDetailCard({ name, version, rulesCount, description }: {
  name: string;
  version: string;
  rulesCount: number;
  description: string;
}) {
  return (
    <div className="card-base p-7 hover-scale">
      {/* 框架標誌和標題 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-block p-3 bg-blue-50 text-blue-700 rounded-xl text-2xl mb-3">
            {name.slice(0, 1).toUpperCase()}
          </span>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
          v{version}
        </span>
      </div>
      
      {/* 框架描述 */}
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      
      {/* 統計數據 */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">規則數量</p>
          <p className="text-lg font-semibold text-gray-800">{rulesCount}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">更新頻率</p>
          <p className="text-lg font-semibold text-gray-800">每週</p>
        </div>
      </div>
      
      {/* 相容性標籤 */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">TypeScript</span>
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">ESLint</span>
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">VSCode</span>
        </div>
      </div>
    </div>
  )
}