import QuestionContainer from '@/components/question/QuestionContainer';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { QuestionSearchByType } from '@/features/question/hooks/useQuestionSearchParams';
import { QuestionListFilterType } from '@/features/question/hooks/useQuestionSearchParams';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getQuestionListOnServer } from '@/features/question/api/getQuestionListOnServer';
import QuestionPageButton from '@/components/question/QuestionPageButton';

export default async function QuestionPage({
  params,
  searchParams,
}: {
  params: { lectureId: string };
  searchParams: { filter: QuestionListFilterType; page: number; searchBy: QuestionSearchByType; keyword: string };
}) {
  const { lectureId } = params;
  const { filter, page, searchBy, keyword } = searchParams;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.questionList({ lectureId, page, searchBy, keyword }),
    queryFn: () => getQuestionListOnServer({ lectureId, page, searchBy, keyword }),
  });

  return (
    <div className='flex flex-col max-w-[1018px] h-full'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='flex items-center px-[5px] gap-[10px] mb-[20px]'>
          <img
            src='/assets/icons/sidenav/question_selected.png'
            alt='퀴즈 페이지'
            className='w-[28px] h-[28px]'
          />
          <h1 className='text-title3 font-bold'>질문</h1>
        </div>
        <QuestionContainer
          lectureId={lectureId}
          searchParams={{ page, searchBy, keyword }}
        />
        <QuestionPageButton
          lectureId={lectureId}
          searchParams={{ page, searchBy, keyword }}
        />
      </HydrationBoundary>
    </div>
  );
}
