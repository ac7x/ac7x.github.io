import Link from 'next/link'
import { frameworks } from '@/lib/data'

export default function FrameworksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">支援框架</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map(framework => (
          <Link href={`/frameworks/${framework.id}`} key={framework.id}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{framework.name}</h2>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  v{framework.version}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{framework.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{framework.rulesCount} 條規則</span>
                <span className="text-blue-600">查看詳情 →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}