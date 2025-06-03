export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type FetchOptions = {
  method: Method;
  endpoint: string;
  body?: any;
};

export async function fetcher<T>({ method, endpoint, body }: FetchOptions): Promise<T> {
  // 서버 주소 .env -> 나중 반영 필요
  const res = await fetch(`http://localhost:8080${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => {});
    throw new Error(err.message || 'API 요청 실패');
  }

  const data = await res.json();
  console.log('요청 성공', data);
  return data;
}
