'use client'

import { useState } from 'react'

interface FeedbackFormProps {
  ruleId?: string
}

export default function FeedbackForm({ ruleId }: FeedbackFormProps) {
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | 'suggestion'>('suggestion')
  const [comment, setComment] = useState('')
  const [improvement, setImprovement] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ruleId,
          feedbackType,
          comment,
          suggestedImprovement: improvement,
          timestamp: new Date().toISOString()
        })
      })
      
      if (response.ok) {
        setSubmitted(true)
        setComment('')
        setImprovement('')
      }
    } catch (error) {
      console.error('提交反饋時出錯:', error)
    }
  }
  
  if (submitted) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-green-800 border border-green-200">
        <p className="font-medium">謝謝您的反饋！</p>
        <p className="text-sm mt-2">您的意見將幫助我們改進規則集。</p>
      </div>
    )
  }
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">提供反饋</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">反饋類型</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="feedbackType"
                checked={feedbackType === 'positive'}
                onChange={() => setFeedbackType('positive')}
              />
              <span className="ml-2">正面評價</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="feedbackType"
                checked={feedbackType === 'negative'}
                onChange={() => setFeedbackType('negative')}
              />
              <span className="ml-2">負面評價</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="feedbackType"
                checked={feedbackType === 'suggestion'}
                onChange={() => setFeedbackType('suggestion')}
              />
              <span className="ml-2">建議</span>
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            您的反饋
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="請分享您對此規則的想法..."
            required
          />
        </div>
        
        {(feedbackType === 'negative' || feedbackType === 'suggestion') && (
          <div className="mb-4">
            <label htmlFor="improvement" className="block text-sm font-medium mb-2">
              建議改進
            </label>
            <textarea
              id="improvement"
              rows={3}
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="您有什麼建議來改進這個規則？"
            />
          </div>
        )}
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          提交反饋
        </button>
      </form>
    </div>
  )
}