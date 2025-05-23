import Header from '@/components/layouts/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-1 w-full min-w-fit min-h-screen bg-gray-10'>
      <div className='flex flex-col justify-start items-start w-full max-w-[1320px] h-full max-[1320px]:px-[20px] mx-auto'>
        <Header />
        <main className='flex-1 flex flex-col justify-center max-[750px]:items-start items-center w-full h-full'>
          {children}
        </main>
      </div>
    </div>
  );
}
