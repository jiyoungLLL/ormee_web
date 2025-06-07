import { getHeaders } from '@/utils/getApiConfig';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { lectureId: string } }) {
  const lectureId = params.lectureId;
  const body = await req.json();

  const headers = await getHeaders();
  const response = await fetch(`${process.env.API_BASE_URL}/teachers/${lectureId}/quizzes`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });

  return response;
}
