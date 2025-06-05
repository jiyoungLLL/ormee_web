import { getHeaders } from '@/utils/getApiConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
  }

  const headers = await getHeaders();

  const response = await fetch(`${process.env.API_BASE_URL}/attachment`, {
    method: 'POST',
    headers,
    body: formData,
  });

  return response;
}
