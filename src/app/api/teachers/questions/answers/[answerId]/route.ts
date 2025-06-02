import { getHeaders } from '@/utils/getApiConfig';
import { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { answerId: string } }) {
  const { answerId } = params;
  const headers = await getHeaders();

  const response = await fetch(`${process.env.API_BASE_URL}/teachers/questions/answers/${answerId}`, {
    method: 'DELETE',
    headers,
  });

  return response;
}
