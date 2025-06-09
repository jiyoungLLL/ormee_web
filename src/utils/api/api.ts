export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type FetchOptions = {
  method: Method;
  endpoint: string;
  body?: any;
};

export async function fetcher<T>({ method, endpoint, body }: FetchOptions): Promise<T> {
  // 서버 주소 .env -> 나중 반영 필요
  const res = await fetch(`https://52.78.13.49.nip.io:8443${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    const errorMessage = data?.message || 'API 요청 실패';
    throw new Error(errorMessage);
  }

  return data;
}
