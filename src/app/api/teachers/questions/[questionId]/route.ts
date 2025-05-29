import { getHeaders } from '@/utils/getApiConfig';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { questionId: string } }) {
  const { questionId } = params;
  const headers = await getHeaders();

  const response = await fetch(`${process.env.API_BASE_URL}/teachers/questions/${questionId}`, {
    method: 'GET',
    headers,
  });

  return response;
}
