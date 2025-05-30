import { getHeaders } from '@/utils/getApiConfig';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { lectureId: string } }) {
  const lectureId = params.lectureId;
  const searchParams = req.nextUrl.search;

  const headers = await getHeaders();

  const response = await fetch(`${process.env.API_BASE_URL}/teachers/${lectureId}/questions?${searchParams}`, {
    method: 'GET',
    headers,
  });

  return response;
}
