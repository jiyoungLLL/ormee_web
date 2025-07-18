'use client';

import { fetcher, FetchOptions, Method } from '@/utils/api/api';
import { MutationOptions, useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { z } from 'zod';

export function validateResponse<T>(schema: z.ZodSchema<T>, data: unknown, errorMessage?: string): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('----- API 응답 검증 실패 ------');
      console.error('응답 데이터: ', data);
      console.error('에러 메시지: ', result.error.message);
    }

    throw new Error(errorMessage || `${result.error.issues[0].message}`);
  }

  return result.data;
}

type UseApiQueryOptions<T, R = T> = {
  /** Tanstack Query의 쿼리 키 */
  queryKey: readonly unknown[];
  /** API 요청을 위한 옵션 (method 제외) */
  fetchOptions: Omit<FetchOptions, 'method'>;
  /** Tanstack Query의 추가 옵션 (queryKey와 queryFn 제외) */
  queryOptions?: Omit<UseQueryOptions<R, Error>, 'queryKey' | 'queryFn'>;
  /** API 응답 데이터 검증을 위한 Zod 스키마 */
  schema?: z.ZodSchema<T>;
  /** API 응답 데이터를 변환하는 함수 */
  transform?: (data: T) => R;
  /** API 응답 데이터 검증 실패 시 표시할 에러 메시지 */
  validateErrorMessage?: string;
};

/**
 * API 쿼리 훅 - GET 요청을 위한 Tanstack Query 래퍼
 * @template T API 응답 데이터의 타입
 * @template R 변환된 응답 데이터의 타입 (기본값은 T)
 *
 * @param {UseApiQueryOptions<T, R>} options - API 쿼리 옵션
 * @param {readonly unknown[]} options.key - Tanstack Query의 쿼리 키
 * @param {Omit<FetchOptions, 'method'>} options.fetchOptions - API 요청을 위한 옵션 (method 제외)
 * @param {Omit<UseQueryOptions<R, Error>, 'queryKey' | 'queryFn'>} [options.queryOptions] - Tanstack Query의 추가 옵션
 * @param {z.ZodSchema<T>} [options.schema] - API 응답 데이터 검증을 위한 Zod 스키마
 * @param {(data: T) => R} [options.transform] - API 응답 데이터를 변환하는 함수
 * @param {string} [options.validateErrorMessage] - API 응답 데이터 검증 실패 시 표시할 에러 메시지
 * @returns Tanstack Query의 쿼리 결과
 * @example
 * ```ts
 * const { data, isLoading } = useApiQuery({
 *   key: QUERY_KEYS.profile(),
 *   fetchOptions: {
 *     endpoint: '/teachers/profile',
 *     authorization: true
 *   },
 *   schema: profileSchema,
 *   transform: (data) => ({
 *     name: data.name,
 *     image: data.image
 *   })
 * });
 * ```
 */

export function useApiQuery<T, R = T>({
  queryKey,
  fetchOptions,
  queryOptions,
  schema,
  transform,
  validateErrorMessage,
}: UseApiQueryOptions<T, R>) {
  return useQuery<R, Error>({
    queryKey,
    queryFn: async (): Promise<R> => {
      const response = await fetcher<T>({ method: 'GET', ...fetchOptions });

      if (response.status === 'fail') {
        throw new Error(response.data);
      }

      let validatedData = response.data;

      // 스키마 검증
      if (schema) {
        validatedData = validateResponse(schema, response.data, validateErrorMessage) as unknown as T;
      }

      // 데이터 변환
      if (transform) {
        return transform(validatedData) as R;
      }

      return validatedData as unknown as R;
    },
    ...queryOptions,
  });
}

/**
 * API Mutation 훅의 옵션 타입
 * @template T API 응답 데이터의 타입
 * @template V 요청 데이터(body)의 타입
 * @template R 변환된 응답 데이터의 타입 (기본값은 T)
 */
type UseApiMutationOptions<T, V, R = T> = {
  /** HTTP 메서드 (GET 제외) */
  method: Exclude<Method, 'GET'>;
  /** API 엔드포인트 */
  endpoint: string | ((variables: V) => string);
  /** API 요청을 위한 옵션 (method와 endpoint 제외) */
  fetchOptions: Omit<FetchOptions, 'method' | 'endpoint'>;
  /** 요청 데이터 검증을 위한 Zod 스키마 */
  requestSchema?: z.ZodSchema<V>;
  /** 응답 데이터 검증을 위한 Zod 스키마 */
  responseSchema?: z.ZodSchema<T>;
  /**
   * 요청 데이터를 변환하는 함수
   * @param data - 변환할 요청 데이터
   * @returns 변환된 요청 데이터
   */
  requestTransform?: (data: V) => unknown;
  /**
   * 응답 데이터를 변환하는 함수
   * @param data - 변환할 응답 데이터
   * @returns 변환된 응답 데이터
   */
  responseTransform?: (data: T) => R;
  /**
   * Mutation 성공 시 호출되는 콜백 함수
   * @param data - 변환된 응답 데이터
   */
  onSuccess?: (data?: R) => void;
  /**
   * Mutation 성공 시 무효화할 쿼리 키
   * 단일 키 또는 키 배열의 배열을 전달할 수 있습니다
   */
  invalidateKey?: readonly unknown[] | readonly unknown[][];
  /**
   * Mutation 실패 시 호출되는 콜백 함수
   * @param err - 발생한 에러
   */
  onError?: (err: Error) => void;
  /** Tanstack Query의 mutation 옵션 (mutationFn, onSuccess, onError 제외) */
  mutationOptions?: Omit<MutationOptions<R, Error, V>, 'mutationFn' | 'onSuccess' | 'onError'>;
  /** API 요청 데이터 검증 실패 시 표시할 에러 메시지 */
  requestValidateErrorMessage?: string;
  /** API 응답 데이터 검증 실패 시 표시할 에러 메시지 */
  responseValidateErrorMessage?: string;
};

/**
 * API Mutation 훅 - POST, PUT, DELETE 등의 mutation 요청을 위한 Tanstack Query 래퍼
 *
 * @template T API 응답 데이터의 타입
 * @template V 요청 데이터(body)의 타입
 * @template R 변환된 응답 데이터의 타입 (기본값은 T)
 *
 * @param {UseApiMutationOptions<T, V, R>} options - API Mutation 옵션
 * @param {Exclude<Method, 'GET'>} options.method - HTTP 메서드
 * @param {string} options.endpoint - API 엔드포인트
 * @param {Omit<FetchOptions, 'method' | 'endpoint'>} options.fetchOptions - API 요청 옵션
 * @param {z.ZodSchema<V>} [options.requestSchema] - 요청 데이터 검증을 위한 Zod 스키마
 * @param {z.ZodSchema<T>} [options.responseSchema] - 응답 데이터 검증을 위한 Zod 스키마
 * @param {(data: V) => unknown} [options.requestTransform] - 요청 데이터 변환 함수
 * @param {(data: T) => R} [options.responseTransform] - 응답 데이터 변환 함수
 * @param {(data?: R) => void} [options.onSuccess] - 성공 시 콜백 함수
 * @param {readonly unknown[] | readonly unknown[][]} [options.invalidateKey] - 무효화할 쿼리 키
 * @param {(err: Error) => void} [options.onError] - 실패 시 콜백 함수
 * @param {Omit<MutationOptions<R, Error, V>, 'mutationFn' | 'onSuccess' | 'onError'>} [options.mutationOptions] - Tanstack Query mutation 옵션
 * @param {string} [options.requestValidateErrorMessage] - API 요청 데이터 검증 실패 시 표시할 에러 메시지
 * @param {string} [options.responseValidateErrorMessage] - API 응답 데이터 검증 실패 시 표시할 에러 메시지
 *
 * @returns Tanstack Query의 mutation 결과
 *
 * @example
 * ```ts
 * const { mutate } = useApiMutation<ProfileResponse, UpdateProfileRequest, TransformedProfile>({
 *   method: 'PUT',
 *   endpoint: '/teachers/profile',
 *   requestSchema: updateProfileRequestSchema,
 *   responseSchema: profileResponseSchema,
 *   requestTransform: (data) => ({
 *     ...data,
 *     bio: data.bio.trim(),
 *   }),
 *   responseTransform: (data) => ({
 *     fullName: `${data.firstName} ${data.lastName}`,
 *     bio: data.bio || '소개가 없습니다',
 *     imageUrl: data.imageUrl || '/default-avatar.png',
 *     lastUpdated: new Date(data.updatedAt).toLocaleDateString('ko-KR'),
 *   }),
 *   fetchOptions: {
 *     authorization: true,
 *   },
 *   onSuccess: (data) => {
 *     console.log(data.fullName);
 *   },
 * });
 * ```
 */
export function useApiMutation<T, V = undefined, R = T>({
  method,
  endpoint,
  fetchOptions,
  requestSchema,
  responseSchema,
  requestTransform,
  responseTransform,
  onSuccess,
  invalidateKey,
  onError,
  mutationOptions,
  requestValidateErrorMessage,
  responseValidateErrorMessage,
}: UseApiMutationOptions<T, V, R>) {
  const queryClient = useQueryClient();

  const handleSuccess = (data?: R) => {
    if (invalidateKey) {
      if (Array.isArray(invalidateKey[0])) {
        (invalidateKey as readonly unknown[][]).forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      } else {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    }
    onSuccess?.(data);
  };

  return useMutation<R, Error, V>({
    mutationFn: async (body?: V) => {
      // 요청 데이터 검증
      if (requestSchema) {
        const result = requestSchema.safeParse(body);
        if (!result.success) {
          if (process.env.NODE_ENV === 'development') {
            console.error('----- API 요청 데이터 검증 실패 ------');
            console.error('요청 데이터: ', body);
            console.error('에러 메시지: ', result.error.message);
          }
          throw new Error(requestValidateErrorMessage || `${result.error.issues[0].message}`);
        }
      }

      // 요청 데이터 변환
      const transformedBody = requestTransform ? requestTransform(body as V) : body;

      const resolvedEndpoint = typeof endpoint === 'function' ? endpoint(body as V) : endpoint;

      const response = await fetcher<T>({
        method,
        endpoint: resolvedEndpoint,
        body: transformedBody,
        ...fetchOptions,
      });

      if (response.status === 'fail') {
        throw new Error(response.data);
      }

      let validatedData = response.data;

      // 응답 데이터 검증
      if (responseSchema) {
        validatedData = validateResponse(responseSchema, response.data, responseValidateErrorMessage) as unknown as T;
      }

      // 응답 데이터 변환
      if (responseTransform) {
        return responseTransform(validatedData) as R;
      }

      return validatedData as unknown as R;
    },
    onSuccess: handleSuccess,
    onError,
    ...mutationOptions,
  });
}
