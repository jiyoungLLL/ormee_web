import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { lectureId: string } }) {
  const lectureId = params.lectureId;
  const searchParams = req.nextUrl.search;

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return new Response(
      JSON.stringify({
        message: '로그인이 필요합니다.',
      }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const response = await fetch(`${process.env.API_BASE_URL}/teachers/${lectureId}/questions?${searchParams}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}
