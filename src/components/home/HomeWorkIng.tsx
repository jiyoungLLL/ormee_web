import HomeSlide from '@/components/home/HomeSlide';
import { useGetHome } from '@/features/home/hooks/useGetHome';

export default function HomeWorkIng() {
  const { data } = useGetHome();
  const assignmentData = data?.assignments;

  return (
    <div className='w-full h-[169px] flex flex-col gap-[10px]'>
      <div className='text-heading2 font-semibold'>
        진행중인 과제 <span className='text-purple-50'>{assignmentData?.length}</span>
      </div>
      <HomeSlide data={assignmentData ?? []} />
    </div>
  );
}
