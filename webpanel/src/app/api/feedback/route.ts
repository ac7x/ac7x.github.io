import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const feedbackPath = path.join(process.cwd(), 'data', 'feedback.json');

// 確保反饋目錄存在
function ensureFeedbackFile() {
  const dir = path.dirname(feedbackPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(feedbackPath)) {
    fs.writeFileSync(feedbackPath, JSON.stringify([]));
  }
}

// 載入反饋
function loadFeedback() {
  try {
    ensureFeedbackFile();
    return JSON.parse(fs.readFileSync(feedbackPath, 'utf8'));
  } catch (err) {
    console.error('無法載入反饋資料:', err);
    return [];
  }
}

// 保存反饋
function saveFeedback(feedback: any[]) {
  try {
    ensureFeedbackFile();
    fs.writeFileSync(feedbackPath, JSON.stringify(feedback, null, 2));
    return true;
  } catch (err) {
    console.error('無法保存反饋資料:', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // 資料驗證
    if (!data.feedbackType || !data.comment) {
      return NextResponse.json({ error: '缺少必要欄位' }, { status: 400 });
    }
    
    // 載入現有反饋
    const feedback = loadFeedback();
    
    // 添加新反饋
    const newFeedback = {
      id: `feedback_${Date.now()}`,
      ruleId: data.ruleId || 'general',
      feedbackType: data.feedbackType,
      comment: data.comment,
      suggestedImprovement: data.suggestedImprovement || '',
      timestamp: data.timestamp || new Date().toISOString()
    };
    
    feedback.push(newFeedback);
    
    // 保存更新後的反饋
    if (saveFeedback(feedback)) {
      return NextResponse.json({ success: true, id: newFeedback.id });
    } else {
      return NextResponse.json({ error: '無法保存反饋' }, { status: 500 });
    }
  } catch (err) {
    console.error('處理反饋時出錯:', err);
    return NextResponse.json({ error: '處理請求時發生錯誤' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const feedback = loadFeedback();
    return NextResponse.json(feedback);
  } catch (err) {
    console.error('獲取反饋時出錯:', err);
    return NextResponse.json({ error: '處理請求時發生錯誤' }, { status: 500 });
  }
}