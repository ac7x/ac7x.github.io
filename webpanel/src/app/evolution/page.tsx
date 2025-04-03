import { RuleUsageTracker } from '@/lib/analytics/client';

export default async function EvolutionPage() {
  // 在伺服器端載入使用統計
  const usage = await RuleUsageTracker.getUsageStats();
  
  return (
    <div className="animate-fade-in">
      {/* 頁面標題區域 */}
      <div className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">規則進化中心</h1>
        <p className="text-gray-600 max-w-2xl">
          監控規則的使用情況、反饋和改進建議，實現規則的持續進化
        </p>
      </div>
      
      {/* 統計概覽區 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="規則違規總數" 
          value={usage.totalViolations} 
          change={usage.violationChange} 
          icon="📊" 
        />
        <StatCard 
          title="反饋數量" 
          value={usage.feedbackCount} 
          change={usage.feedbackChange}
          icon="💬" 
        />
        <StatCard 
          title="改進建議" 
          value={usage.suggestionCount} 
          change={0}
          icon="💡" 
        />
      </div>
      
      {/* 違規最多的規則 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">違規最多的規則</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">規則 ID</th>
                <th className="px-4 py-3 text-left">框架</th>
                <th className="px-4 py-3 text-left">違規次數</th>
                <th className="px-4 py-3 text-left">趨勢</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usage.topViolatedRules.map((rule, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{rule.id}</td>
                  <td className="px-4 py-3">{rule.framework}</td>
                  <td className="px-4 py-3">{rule.violationCount}</td>
                  <td className="px-4 py-3">
                    <TrendIndicator trend={rule.trend} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 最近反饋 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">最近反饋</h2>
        <div className="space-y-4">
          {usage.recentFeedback.map((item, i) => (
            <div key={i} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{item.ruleId}</p>
                  <p className="text-gray-600">{item.comment}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.feedbackType === 'positive' ? 'bg-green-100 text-green-800' : 
                  item.feedbackType === 'negative' ? 'bg-red-100 text-red-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {item.feedbackType}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 改進建議 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">自動改進建議</h2>
        <div className="space-y-4">
          {usage.improvementSuggestions.map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium">
                  {item.type === 'rule_improvement' ? `改進規則: ${item.ruleId}` : '新規則建議'}
                </p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.priority === 'high' ? 'bg-red-100 text-red-800' : 
                  item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {item.priority} 優先級
                </span>
              </div>
              <p className="text-gray-600 mb-2">{item.reason}</p>
              <p className="text-gray-700">{item.suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, icon }: { 
  title: string, 
  value: number, 
  change: number,
  icon: string 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          change > 0 ? 'bg-red-100 text-red-800' : 
          change < 0 ? 'bg-green-100 text-green-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {change > 0 ? `+${change}%` : change < 0 ? `${change}%` : '持平'}
        </span>
      </div>
      <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  )
}

function TrendIndicator({ trend }: { trend: number }) {
  if (trend > 0) {
    return <span className="text-red-500">↑ {trend}%</span>
  } else if (trend < 0) {
    return <span className="text-green-500">↓ {Math.abs(trend)}%</span>
  } else {
    return <span className="text-gray-500">→ 持平</span>
  }
}