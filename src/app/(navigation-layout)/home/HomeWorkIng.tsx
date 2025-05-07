import HomeSlide from '@/components/ui/HomeSlide';
import { MOCK_HOME_SLIDE } from '@/mock/home';

export default function HomeWorkIng() {
  return (
    <div className='w-full h-[169px] flex flex-col gap-[10px]'>
      <div className='text-heading2 font-semibold'>
        진행중인 과제 <span className='text-purple-50'>{'5'}</span>
      </div>
      <HomeSlide data={MOCK_HOME_SLIDE} />
    </div>
  );
}
