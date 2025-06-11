import Header from '@/components/layouts/Header';
import Notification from '@/components/notification/Notification';
import HeaderProfile from '@/components/profiles/HeaderProfile';
import { getProfileAction } from '@/features/profile/profile.action';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { MOCK_USER_PROFILE } from '@/mock/profile';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 3,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.profile(),
    queryFn: getProfileAction,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex-1 w-full min-w-fit min-h-screen bg-gray-10 max-[1310px]:px-[10px]'>
        <div className='flex flex-col justify-start items-start w-full max-w-[1320px] h-full mx-auto'>
          <Header>
            <div className='flex flex-row justify-between items-center gap-[30px]'>
              <Notification />
              <HeaderProfile userProfileData={MOCK_USER_PROFILE} />
            </div>
          </Header>
          <main className='flex-1 flex flex-col justify-center w-full h-full'>{children}</main>
        </div>
        <div id='profile-root' />
        <div id='notification-root' />
      </div>
    </HydrationBoundary>
  );
}
