export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type FetchOptions = {
  method: Method;
  endpoint: string;
  body?: any;
};

const BASE_URL = process.env.BASE_URL;

export async function fetcher<T>({ method, endpoint, body }: FetchOptions): Promise<T> {
  // 서버 주소 .env -> 나중 반영 필요
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: any = null;

  // try {
  //   data = await res.json();
  // } catch {
  //   data = null;
  // }

  // if (!res.ok) {
  //   return {
  //     success: false,
  //     error: data?.message || 'API 요청 실패',
  //     code: data?.code, // 필요에 따라
  //   };
  // }

  // return {
  //   success: true,
  //   data,
  // };
}
