import { NextRequest, NextResponse } from 'next/server';
import { ClassListResponse } from '@/features/class/class.types';
import { ApiResponse } from '@/types/response.types';

const unauthenticatedOnlyRoutes = ['/signin', '/signup'];

const checkUserLecturesForMiddleware = async (
  accessToken: string,
): Promise<{ code: number; hasLecture: boolean; lectureId: string | null }> => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/teachers/lectures`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { code: response.status, hasLecture: false, lectureId: null };
    }

    const data: ApiResponse<ClassListResponse> = await response.json();

    if (data.status === 'success') {
      const { openLectures, closedLectures } = data.data;
      const hasLecture = openLectures?.length > 0 || closedLectures?.length > 0;
      const firstLectureId = openLectures?.[0]?.id || closedLectures?.[0]?.id || null;

      return { code: 200, hasLecture, lectureId: firstLectureId };
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('checkUserLectures 데이터: ', data);
    }

    return { code: data.code || 400, hasLecture: false, lectureId: null };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('checkUserLectures 에러: ', error);
    }

    return { code: 400, hasLecture: false, lectureId: null };
  }
};

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    const { code, hasLecture, lectureId } = await checkUserLecturesForMiddleware(accessToken);

    if (code === 401) {
      const response = NextResponse.redirect(new URL('/signin', request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }

    if (hasLecture && lectureId) {
      return NextResponse.redirect(new URL(`/lectures/${lectureId}/home`, request.url));
    }

    return NextResponse.redirect(new URL('/mypage/class', request.url));
  }

  if (unauthenticatedOnlyRoutes.some((route) => pathname.startsWith(route))) {
    if (accessToken) {
      const { code, hasLecture, lectureId } = await checkUserLecturesForMiddleware(accessToken);

      if (code === 401) {
        const response = NextResponse.redirect(new URL('/signin', request.url));
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        return response;
      }

      if (hasLecture && lectureId) {
        return NextResponse.redirect(new URL(`/lectures/${lectureId}/home`, request.url));
      }

      return NextResponse.redirect(new URL('/mypage/class', request.url));
    }

    return NextResponse.next();
  }

  if (!accessToken) {
    const url = new URL('/signin', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
